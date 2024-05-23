import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';

interface CustomFormLabelProps extends TypographyProps {
  htmlFor: string;
}

const CustomFormLabel = styled(
  ({ ...props }: CustomFormLabelProps) => (
    <Typography
      variant="subtitle1"
      fontWeight={600}
      {...props}
    />
  )
)(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

export default CustomFormLabel;
