import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './style';

function createData(tier: string, allocPerSlot: string, startBuyTime: string, endBuyTime: string) {
  return { tier, allocPerSlot, startBuyTime, endBuyTime };
}

const rows = [
  createData('---', '00', '---', '---'),
  createData('Autobots', '20', '00:00 AM, 23 March 2022 (GMT +07:00)', '00:00 AM, 25 March 2022 (GMT +07:00)'),
  createData('Decepticons', '30', '00:00 AM, 25 March 2022 (GMT +07:00)', '00:00 AM, 27 March 2022 (GMT +07:00)'),
  createData('Maximals', '50', '00:00 AM, 27 March 2022 (GMT +07:00)', '00:00 AM, 29 March 2022 (GMT +07:00)'),
];

const SchedulerTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tier</TableCell>
            <TableCell align="right">Allocation (%)</TableCell>
            <TableCell>Start Buy Time</TableCell>
            <TableCell>End Buy Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.tier}>
              <TableCell component="th" scope="row">
                {row.tier}
              </TableCell>
              <TableCell align="right">{row.allocPerSlot}</TableCell>
              <TableCell>{row.startBuyTime}</TableCell>
              <TableCell>{row.endBuyTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SchedulerTable;