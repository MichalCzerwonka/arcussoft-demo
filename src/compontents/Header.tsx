import { useState, useEffect } from 'react';
import { getUsers } from '../api/users';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type User = {
  id: number,
  first_name: string,
  last_name: string,
}

const Header = () => {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(value => {
        setUsers(value.data.data);
      })
      .catch(e => {
        setError(true);
      }).finally(() => {
      setIsLoading(false);
    });

  }, []);

  return <div>
    To jest nasz Header - {value}
    <div>
      <Button variant="contained" onClick={() => setValue(prevstate => prevstate + 1)}>
        Ustawianie wartosci
      </Button>
    </div>

    {isError ? <div>Wystąpił błąd, spróbuj ponownie później.</div> : null}
    {isLoading ? <div>Ładowanie...</div> : null}

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.first_name}</TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
};

export default Header;