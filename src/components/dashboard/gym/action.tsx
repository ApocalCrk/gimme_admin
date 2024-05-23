import { API_URL } from '@/utils/constants';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { gymClient } from '@/lib/gym/client';

interface UseInsertGymResult {
    insertGym: (gym: FormData) => Promise<void>;
    loading: boolean;
}

interface UseUpdateGymResult {
    updateGym: (id: string, gym: FormData) => Promise<void>;
    loading: boolean;
}

interface UseDeleteGymResult {
    deleteGym: (id: string) => Promise<void>;
    loading: boolean;
}

export const useInsertGym = (): UseInsertGymResult => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const insertGym = async (gym: FormData) => {
        setLoading(true);
        try {
            const response = await gymClient.insertGym(gym);

            if (!response) {
                toast.error('Failed to insert gym');
                return;
            }

            toast.success('Gym inserted successfully');
            router.push('/dashboard/gym');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { insertGym, loading };
};

export const useUpdateGym = (): UseUpdateGymResult => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const updateGym = async (id: string, gym: FormData) => {
        setLoading(true);
        try {
            const response = await gymClient.updateGym(id, gym);

            if (!response) {
                toast.error('Failed to update gym');
                return;
            }

            toast.success('Gym updated successfully');
            router.push('/dashboard/gym');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateGym, loading };
}


export const useDeleteGym = (): UseDeleteGymResult => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const deleteGym = async (id: string) => {
        setLoading(true);
        try {
            const response = await gymClient.deleteGym(id);

            if (!response) {
                toast.error('Failed to delete gym');
                return;
            }

            toast.success('Gym deleted successfully');
            router.push('/dashboard/gym');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteGym, loading };
}