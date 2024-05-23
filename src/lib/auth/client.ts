'use client';

import { API_URL } from '@/utils/constants';
import { User } from '@/types/user';


export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    const loginData = fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { error } = await loginData.then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        return { error: data.message };
      }

      const data = await response.json();
      localStorage.setItem('auth-token', data.token);
      return {};
    });

    return { error };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    const getData = fetch(`${API_URL}/admin/getData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await getData.then(async (response) => {
      if (!response.ok) {
        return { data: null };
      }

      const data = await response.json();
      return { data };
    });

    return { data: data.data };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
