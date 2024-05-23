'use client';

import { API_URL } from '@/utils/constants';
import { Transaction } from '@/types/transaction';

class TransactionClient {
  async getTransactions(): Promise<{ data?: Transaction[] | null; error?: string }> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    const getData = fetch(`${API_URL}/admin/getTransactionData`, {
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

export const transactionClient = new TransactionClient();
