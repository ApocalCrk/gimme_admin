import * as React from 'react';
import FormUpdate from '@/components/dashboard/gym/formUpdate';

export default function Page({
    params
    }: {
    params: {
        id: string;
    };
    }): React.JSX.Element {
  return (
    <FormUpdate id={params.id} />
  );
}