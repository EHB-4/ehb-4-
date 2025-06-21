import React, { useState, useEffect } from 'react';

// Mobile App Integration for EMO System

export interface MobileConfig {
  enablePWA: boolean;
  enablePushNotifications: boolean;
  enableOfflineMode: boolean;
  enableBiometricAuth: boolean;
  enableGeolocation: boolean;
}

export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
}

export interface PWAManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  background_color: string;
  theme_color: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
}

export interface MobileAppConfig {
  enableOfflineMode: boolean;
  enablePushNotifications: boolean;
  enableBiometricAuth: boolean;
  enableLocationServices: boolean;
  syncInterval: number; // in minutes
}

// PWA Service
export class PWAService {
  private static instance: PWAService;
  private registration: ServiceWorkerRegistration | null = null;

  static getInstance(): PWAService {
    if (!PWAService.instance) {
      PWAService.instance = new PWAService();
    }
    return PWAService.instance;
  }

  // Register service worker
  async register(): Promise<ServiceWorkerRegistration | null> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
        return this.registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    }
    return null;
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (this.registration) {
      try {
        await this.registration.unregister();
        this.registration = null;
        console.log('Service Worker unregistered successfully');
        return true;
      } catch (error) {
        console.error('Service Worker unregistration failed:', error);
        return false;
      }
    }
    return false;
  }

  // Check if PWA is installed
  isInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }

  // Get PWA manifest
  getManifest(): PWAManifest {
    return {
      name: 'EMO System',
      short_name: 'EMO',
      description: 'E-commerce Management Operations',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ef4444',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    };
  }
}

// Push Notification Service
export class PushNotificationService {
  private static instance: PushNotificationService;
  private swRegistration: ServiceWorkerRegistration | null = null;

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  // Initialize push notifications
  async initialize(swRegistration: ServiceWorkerRegistration): Promise<boolean> {
    this.swRegistration = swRegistration;

    if (!('PushManager' in window)) {
      console.warn('Push notifications not supported');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Push notification initialization failed:', error);
      return false;
    }
  }

  // Subscribe to push notifications
  async subscribe(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      console.error('Service Worker not registered');
      return null;
    }

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        ),
      });

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe(): Promise<boolean> {
    if (!this.swRegistration) {
      return false;
    }

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscriptionFromServer(subscription);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Push unsubscription failed:', error);
      return false;
    }
  }

  // Send subscription to server
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Remove subscription from server
  private async removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });
    } catch (error) {
      console.error('Failed to remove subscription from server:', error);
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Offline Storage Service
export class OfflineStorageService {
  private static instance: OfflineStorageService;
  private db: IDBDatabase | null = null;

  static getInstance(): OfflineStorageService {
    if (!OfflineStorageService.instance) {
      OfflineStorageService.instance = new OfflineStorageService();
    }
    return OfflineStorageService.instance;
  }

  // Initialize IndexedDB
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('EMOOfflineDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('orders')) {
          db.createObjectStore('orders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('complaints')) {
          db.createObjectStore('complaints', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('syncQueue')) {
          db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  // Store data offline
  async storeData(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get data from offline storage
  async getData(storeName: string, key?: string): Promise<any> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = key ? store.get(key) : store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Add to sync queue
  async addToSyncQueue(action: string, data: any): Promise<void> {
    await this.storeData('syncQueue', {
      action,
      data,
      timestamp: Date.now(),
      synced: false,
    });
  }

  // Sync offline data when online
  async syncOfflineData(): Promise<void> {
    const syncQueue = await this.getData('syncQueue');

    for (const item of syncQueue) {
      if (!item.synced) {
        try {
          // Perform sync action
          await this.performSyncAction(item.action, item.data);

          // Mark as synced
          item.synced = true;
          await this.storeData('syncQueue', item);
        } catch (error) {
          console.error('Sync failed for item:', item, error);
        }
      }
    }
  }

  // Perform sync action
  private async performSyncAction(action: string, data: any): Promise<void> {
    switch (action) {
      case 'createProduct':
        await fetch('/api/emo/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
      case 'updateProduct':
        await fetch('/api/emo/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
      case 'createOrder':
        await fetch('/api/emo/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
      case 'fileComplaint':
        await fetch('/api/emo/complaints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
      default:
        throw new Error(`Unknown sync action: ${action}`);
    }
  }
}

// Biometric Authentication Service
export class BiometricAuthService {
  private static instance: BiometricAuthService;

  static getInstance(): BiometricAuthService {
    if (!BiometricAuthService.instance) {
      BiometricAuthService.instance = new BiometricAuthService();
    }
    return BiometricAuthService.instance;
  }

  // Check if biometric authentication is available
  async isAvailable(): Promise<boolean> {
    try {
      if ('credentials' in navigator) {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      }
      return false;
    } catch (error) {
      console.log('Biometric authentication not available');
      return false;
    }
  }

  // Authenticate with biometric
  async authenticate(): Promise<boolean> {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          userVerification: 'required',
        },
      });

      return !!credential;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }

  // Register biometric credential
  async register(userId: string): Promise<boolean> {
    try {
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: 'EMO System',
            id: window.location.hostname,
          },
          user: {
            id: new Uint8Array(16),
            name: userId,
            displayName: userId,
          },
          pubKeyCredParams: [
            {
              type: 'public-key',
              alg: -7, // ES256
            },
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
          timeout: 60000,
        },
      });

      return !!credential;
    } catch (error) {
      console.error('Biometric registration failed:', error);
      return false;
    }
  }
}

// Geolocation Service
export class GeolocationService {
  private static instance: GeolocationService;

  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  // Get current location
  async getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }

  // Watch location changes
  watchLocation(
    onSuccess: (position: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void
  ): number | null {
    if (!('geolocation' in navigator)) {
      onError({ code: 2, message: 'Geolocation not supported' } as GeolocationPositionError);
      return null;
    }

    return navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  }

  // Clear location watch
  clearWatch(watchId: number): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

// Mobile App Configuration
export const defaultMobileConfig: MobileAppConfig = {
  enableOfflineMode: true,
  enablePushNotifications: true,
  enableBiometricAuth: true,
  enableLocationServices: false,
  syncInterval: 5, // 5 minutes
};

// Initialize mobile services
export const initializeMobileServices = async (config: MobileAppConfig = defaultMobileConfig) => {
  const services = {
    pwa: PWAService.getInstance(),
    offline: OfflineStorageService.getInstance(),
    biometric: BiometricAuthService.getInstance(),
    location: GeolocationService.getInstance(),
  };

  // Register PWA
  if (config.enableOfflineMode) {
    await services.pwa.register();
    await services.offline.init();
  }

  // Set up online/offline sync
  window.addEventListener('online', () => {
    if (config.enableOfflineMode) {
      services.offline.syncOfflineData();
    }
  });

  // Set up periodic sync
  if (config.enableOfflineMode && config.syncInterval > 0) {
    setInterval(
      () => {
        if (navigator.onLine) {
          services.offline.syncOfflineData();
        }
      },
      config.syncInterval * 60 * 1000
    );
  }

  return services;
};

// Mobile App Hook
export const useMobileApp = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check PWA installation
    const checkPWAInstallation = () => {
      const isInstalled =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsPWAInstalled(isInstalled);
    };

    checkPWAInstallation();
    window.addEventListener('appinstalled', checkPWAInstallation);

    // Check biometric availability
    const checkBiometric = async () => {
      const biometricService = BiometricAuthService.getInstance();
      const available = await biometricService.isAvailable();
      setBiometricAvailable(available);
    };

    checkBiometric();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('appinstalled', checkPWAInstallation);
    };
  }, []);

  return {
    isOnline,
    isPWAInstalled,
    biometricAvailable,
  };
};

// Install PWA prompt
export const useInstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) {
      return false;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      return true;
    }

    return false;
  };

  return {
    showInstallPrompt,
    installPWA,
  };
};
