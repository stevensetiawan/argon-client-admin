import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { EmployeeDetailsForm } from '@/components/dashboard/employee/employee-details-form';
import { EmployeeInfo } from '@/components/dashboard/employee/employee-info';

export const metadata = { title: `Employee | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <EmployeeInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <EmployeeDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
