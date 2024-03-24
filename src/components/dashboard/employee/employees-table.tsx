'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAttendances, selectAttendance } from '@/redux/reducers/attendance';
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

import type { Attendance } from '@/types/attendance';

function noop(): void {
  // do nothing
}

export function EmployeesTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const employeeState = useAppSelector(selectAttendance);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const paginatedEmployees = applyPagination(employeeState.attendances ?? [], page, rowsPerPage);

  React.useEffect(() => {
    const promise = dispatch(getAttendances());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      <RouterLink href="/dashboard/employees/1">
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                          <Avatar src={row.emp_photo} />
                          <Typography variant="subtitle2">{row.name}</Typography>
                        </Stack>
                      </RouterLink>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign="center">Data not found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={paginatedEmployees.length}
        onPageChange={(e, p) => {
          setPage(p);
        }}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

function applyPagination(rows: Attendance[], page: number, rowsPerPage: number): Attendance[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
