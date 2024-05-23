'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { CustomersTable } from '@/components/dashboard/gym/gym-table';
import { Gym as GymType } from '@/types/gym';
import { gymClient } from '@/lib/gym/client';
import { logger } from '@/lib/default-logger';
import { paths } from '@/paths';


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const [gym, setGym] = React.useState<GymType[]>([]);

  const handleGetGyms = async (): Promise<void> => {
    try {
      const { data, error } = await gymClient.getGyms();

      if (error) {
        logger.error('Get gyms error', error);
        return;
      }

      setGym(data ?? []);
    } catch (err) {
      logger.error('Get gyms error', err);
    }
  }

  React.useEffect(() => {
    handleGetGyms();
  }, []);
  
  const paginatedGym = applyPagination(gym, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Gym List</Typography>
        </Stack>
        <div>
          <Button variant="contained" component={RouterLink} href={paths.dashboard.addGym} startIcon={<PlusIcon />}>
            Add
          </Button>
        </div>
      </Stack>
      <CustomersTable
        count={paginatedGym.length}
        page={page}
        rows={paginatedGym}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: GymType[], page: number, rowsPerPage: number): GymType[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
