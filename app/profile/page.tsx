import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserProfile from '../../../components/UserProfile';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchUserData();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleUpdateProfile = (data: any) => {
    // In a real app, this would call the backend to update the profile
    console.log('Updating profile:', data);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      <UserProfile user={userData || { name: session?.user?.name, email: session?.user?.email }} onUpdate={handleUpdateProfile} />
    </div>
  );
}

// AI Guidance: This page displays the user's profile and allows them to update it.
// In a real app, profile data would be fetched from the backend and updated in real-time. 