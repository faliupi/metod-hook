/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/lib/axios-instance';
import axios from 'axios';
import { useState, useEffect } from 'react';

let tokenPromise: Promise<string | null> | null = null;

const getToken = async () => {
  try {
    const response = await fetch('/api/auth/token');
    if (!response.ok) throw new Error('Failed to fetch token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,{
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        setError('Failed to fetch profile');
      }
    } catch (error) {
      setError((error as any).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { profile, loading, error };
};

export default useProfile;