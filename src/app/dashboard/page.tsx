'use client';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import dynamic from 'next/dynamic';
import { Transaction } from '@/components/dashboard/overview/transaction';
import { TotalGym } from '@/components/dashboard/overview/total-gym';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { Transaction as TransactionType } from '@/types/transaction';
import { transactionClient } from '@/lib/transaction/client';
import { usersClient } from '@/lib/users/client';
import { gymClient } from '@/lib/gym/client';
import { logger } from '@/lib/default-logger';
import { Gym as GymType } from '@/types/gym';
import 'leaflet/dist/leaflet.css';

export default function Page(): React.JSX.Element {
  const [transactions, setTransactions] = React.useState<TransactionType[]>([]);
  const [totalCustomer, setTotalCustomer] = React.useState<number>(0);
  const [gym, setGym] = React.useState<GymType[]>([]);

  const handleGetTransactions = async (): Promise<void> => {
    try {
      const { data, error } = await transactionClient.getTransactions();

      if (error) {
        logger.error('Get transactions error', error);
        return;
      }

      setTransactions(data ?? []);
    } catch (err) {
      logger.error('Get transactions error', err);
    }
  }

  const handleGetTotalCustomers = async (): Promise<void> => {
    try {
      const { data, error } = await usersClient.getTotalUsers();

      if (error) {
        logger.error('Get total customers error', error);
        return;
      }

      setTotalCustomer(data ?? 0);
    } catch (err) {
      logger.error('Get total customers error', err);
    }
  }

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

  const MapContainer = dynamic(() => import('react-leaflet').then(module => module.MapContainer), { ssr: false });
  const TileLayer = dynamic(() => import('react-leaflet').then(module => module.TileLayer), { ssr: false });
  const Marker = dynamic(() => import('react-leaflet').then(module => module.Marker), { ssr: false });
  const Popup = dynamic(() => import('react-leaflet').then(module => module.Popup), { ssr: false });
  const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false });

  const L = require('leaflet');

  const gymIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  React.useEffect(() =>{
    handleGetTransactions();
    handleGetTotalCustomers();
    handleGetGyms();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <Transaction sx={{ height: '100%' }} value={transactions.length.toString()} />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalCustomers sx={{ height: '100%' }} value={totalCustomer.toString()} />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalGym sx={{ height: '100%' }} value={gym.length.toString()} />
      </Grid>
      <Grid lg={12} sm={12} xs={12}>
        <MapContainer center={[0.901, 117.664]} zoom={5} style={{ height: '700px', width: '100%' }} maxZoom={20} minZoom={2}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            spiderfyOnMaxZoom={true}
            polygonOptions={{
              fillColor: "#ffffff",
              color: "#f00800",
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8,
            }}
            showCoverageOnHover={true}
          >
            {gym.map((item) => {
              const [lat, long] = item.location.split(', ');
              return <Marker key={`marker-${item.id_gym}`} position={[parseFloat(lat), parseFloat(long)]} icon={gymIcon}>
                <Popup>
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </Popup>
              </Marker>
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </Grid>
    </Grid>
  );
}
