// hooks/useAuthToken.ts
import { useEffect, useState } from 'react';

export const useAuthToken = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (cookies) {
      setToken(decodeURIComponent(cookies)); // Decode cookie value for safety
    }
  }, []);

  return token;
};
