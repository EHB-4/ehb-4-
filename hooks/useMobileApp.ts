import { useState, useEffect } from 'react';

export const useMobileApp = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if PWA is installed
    const checkPWAInstalled = () => {
      // Check if running in standalone mode (installed PWA)
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(isStandaloneMode);
      setIsPWAInstalled(isStandaloneMode);
    };

    // Check biometric availability
    const checkBiometric = async () => {
      try {
        if ('credentials' in navigator) {
          // Check if WebAuthn is supported
          const available =
            await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setBiometricAvailable(available);
        }
      } catch (error) {
        console.log('Biometric authentication not available');
        setBiometricAvailable(false);
      }
    };

    checkPWAInstalled();
    checkBiometric();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Request biometric authentication
  const authenticateWithBiometric = async () => {
    if (!biometricAvailable) {
      throw new Error('Biometric authentication not available');
    }

    try {
      // This is a simplified example - in a real app you'd implement proper WebAuthn
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          userVerification: 'required',
        },
      });

      return credential;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      throw error;
    }
  };

  // Get device information
  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      isStandalone,
    };
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return position;
      }
      throw new Error('Geolocation not supported');
    } catch (error) {
      console.error('Location permission denied:', error);
      throw error;
    }
  };

  return {
    isOnline,
    isPWAInstalled,
    biometricAvailable,
    isStandalone,
    authenticateWithBiometric,
    getDeviceInfo,
    requestLocationPermission,
  };
};
