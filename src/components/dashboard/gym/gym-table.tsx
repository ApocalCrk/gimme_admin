'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Gym as GymType } from '@/types/gym';
import { Button } from '@mui/material';
import { useDeleteGym } from './action';
import 'react-toastify/dist/ReactToastify.css';
import RouterLink from 'next/link';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface GymsTableProps {
  count?: number;
  page?: number;
  rows?: GymType[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: GymsTableProps): React.JSX.Element {
  const { deleteGym } = useDeleteGym();

  const refresh = () => {
    location.reload();
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Open & Close Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.place}</TableCell>
                  <TableCell>{row.open_close_time}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" color="primary" size="small" component={RouterLink} href={`/dashboard/gym/edit/${row.id_gym}`}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" size="small" onClick={() => {
                        deleteGym(String(row.id_gym)).then(() => {
                          refresh();
                        });
                      }}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
