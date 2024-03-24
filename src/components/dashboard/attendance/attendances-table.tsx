'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
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
import dayjs from 'dayjs';

function noop(): void {
  // do nothing
}

export interface Attendance {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface AttendancesTableProps {
  count?: number;
  page?: number;
  rows?: Attendance[];
  rowsPerPage?: number;
}

export function AttendancesTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: AttendancesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Work</TableCell>
              <TableCell>Finish Work</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <RouterLink href="/dashboard/employees/1">
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar src={row.avatar} />
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </RouterLink>
                  </TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('hh:mm:ss')}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('hh:mm:ss')}</TableCell>
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
