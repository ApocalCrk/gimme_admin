import * as React from 'react';
import { Card, CardContent, Divider, Box, CardHeader } from '@mui/material';

const ParentCard: React.FC<{ title: string; children: React.ReactNode; footer?: React.ReactNode }> = ({ title, children, footer }) => {
  return (
    <Card
      sx={{ padding: 0 }}
      elevation={9}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default ParentCard;
