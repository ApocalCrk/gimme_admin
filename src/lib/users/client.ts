'use client';

import { API_URL } from '@/utils/constants';

class UsersClient {
  async getTotalUsers(): Promise<{ data?: number | null; error?: string }> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    const getData = fetch(`${API_URL}/admin/getTotalUsers`, {
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
}

export const usersClient = new UsersClient();
