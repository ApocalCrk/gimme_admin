'use client';

import { API_URL } from '@/utils/constants';
import { Gym } from '@/types/gym';

class GymClient {
  async getGyms(): Promise<{ data?: Gym[] | null; error?: string }> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    const getData = fetch(`${API_URL}/admin/getAllGym`, {
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

  async getGym(id: string): Promise<{ data?: Gym | null; error?: string }> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    const getData = fetch(`${API_URL}/admin/getGymData/${id}`, {
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

  async insertGym(gym: FormData): Promise<{ success: boolean } | void> {
    const token = localStorage.getItem('auth-token');

    try {
      const response = await fetch(`${API_URL}/admin/createGym`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: gym,
      });

      if (!response.ok) {
        return { success: false };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false };
    }
  }

  async updateGym(id: string, gym: FormData): Promise<{ success: boolean } | void> {
    const token = localStorage.getItem('auth-token');

    try {
      const response = await fetch(`${API_URL}/admin/updateGym/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ 
              name: gym.get('name'),
              description: gym.get('description'),
              location: gym.get('location'),
              place: gym.get('place'),
              open_close_time: gym.get('open_close_time'),
              facilities: gym.get('facilities'),
              packages: gym.get('packages'),
              image: gym.get('image'),
          }),
      });

      if (!response.ok) {
        return { success: false };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false };
    }
  }

  async deleteGym(id: string): Promise<{ success: boolean } | void> {
    const token = localStorage.getItem('auth-token');

    try {
      const response = await fetch(`${API_URL}/admin/deleteGym/${id}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${token}`
          },
      });

      if (!response.ok) {
        return { success: false };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false };
    }
  }
  
  
}

export const gymClient = new GymClient();
