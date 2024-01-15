import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';

export default function Report() {
  const location=useLocation()
  const sourceName=location.state.source_name
  const data=location.state.data
  return (
    <div>
      <h1>REPORT</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Source Name</TableCell>
            <TableCell align="right">Total Records Before Processing</TableCell>
            <TableCell align="right">Total Records Before Processing</TableCell>
            <TableCell align="right">Processed On</TableCell>
            <TableCell align="right">Alert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {sourceName}
              </TableCell>
              <TableCell align="right">{data.total_records}</TableCell>
              <TableCell align="right">{data.stored_records}</TableCell>
              <TableCell align="right">{data.processed_on}</TableCell>
              <TableCell align="right">{data.alert}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
