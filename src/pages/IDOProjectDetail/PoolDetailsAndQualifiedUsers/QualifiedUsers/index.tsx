import { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';
import { useStyles } from './style';
import { debounce } from 'lodash';

// interface SnapShotUser {
//   id: number;
//   wallet_address: string;
// }

const QualifiedUsers = (props: any) => {
  const { data, onSearch , poolDetails } = props;
  const classes = useStyles();
  const [searched, setSearched] = useState<string>('');

  const requestSearch = debounce((searchedVal: string) => {
    onSearch(searchedVal);
    setSearched(searchedVal);
  }, 500);

  const cancelSearch = () => {
    requestSearch('');
  };
  console.log(poolDetails);
  return (
    <div className={classes.rowStyle}>
      <div className={classes.colStyle}>
        <SearchBar
          placeholder="Search wallet address"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          className={classes.searchBarStyle}
        />
        {!searched ? (
          <p className={classes.guideSearch}>Search first or last 14 characters of your wallet address</p>
        ) : (
          !data.length && <p className={classes.searchError}>Sorry, there is no wallet address matching your search.</p>
        )}
      </div>
      <div className={classes.colStyle}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Wallet Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {poolDetails?.is_qualified_user_display === 1 && data.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.wallet_address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default QualifiedUsers;
