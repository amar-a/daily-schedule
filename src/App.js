import React, { useState, useEffect } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';

import data from './data/schedule.json';
import { getToday, getScheduleInfo, getRows } from './functions';

import './App.css';
import logo from './logo.png';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  body: {
    fontSize: '12px',
  },
  table: {
    '& tbody>.MuiTableRow-root:hover': {
      background: '#e6f2ff',
    },
    '& tbody>.Mui-selected': {
      background: '#cce6ff',
    },
    '& tbody>.Mui-selected:hover': {
      background: '#cce6ff',
    },
  },
  typography: {
    caption: {
      fontVariant: 'small-caps',
    }
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function App() {
  const classes = useStyles();

  const [settingsState, setSettingsState] = useState('ss');
  const toggleSettingsState = () => {
    setSettingsState(!settingsState);
  }

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [period_1, setPeriod1] = useStateWithLocalStorage('period_1');
  const onP1Change = event => setPeriod1(event.target.value);

  const [period_2, setPeriod2] = useStateWithLocalStorage('period_2');
  const onP2Change = event => setPeriod2(event.target.value);

  const [period_3, setPeriod3] = useStateWithLocalStorage('period_3');
  const onP3Change = event => setPeriod3(event.target.value);

  const [period_4, setPeriod4] = useStateWithLocalStorage('period_4');
  const onP4Change = event => setPeriod4(event.target.value);

  const [period_5, setPeriod5] = useStateWithLocalStorage('period_5');
  const onP5Change = event => setPeriod5(event.target.value);

  const [period_6, setPeriod6] = useStateWithLocalStorage('period_6');
  const onP6Change = event => setPeriod6(event.target.value);

  const [period_7, setPeriod7] = useStateWithLocalStorage('period_7');
  const onP7Change = event => setPeriod7(event.target.value);

  const [period_8, setPeriod8] = useStateWithLocalStorage('period_8');
  const onP8Change = event => setPeriod8(event.target.value);

  const today = [now.getFullYear(), ('0' + (now.getMonth() + 1)).slice(-2), ('0' + now.getDate()).slice(-2)].join('-');

  const items = data.filter(i => i.date === today);

  var display = <Box pt={3}>
    <img src={logo} className="logo" alt="Daily School Schedule" />
    <h2>No classes today.</h2>
  </Box>;

  var group;
  if (items.length > 0) {
    const info = items[0];

    const scheduleInfo = getScheduleInfo(info.day, period_1, period_2, period_3, period_4, period_5, period_6, period_7, period_8);

    const rows = getRows(scheduleInfo, now);

    const schedule = <Box py={1}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="schedule">
          <TableHead>
            <TableRow>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Period</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.key} hover={true} selected={row.selected}>
                <StyledTableCell classes={row.classes}>{row.time}</StyledTableCell>
                <StyledTableCell classes={row.classes}>{row.title}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>;

    const settings = <Box pt={1}>
      <TextField
        id="period-1"
        label="Period #1"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #1"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_1}
        onChange={onP1Change}
      />
      <TextField
        id="period-2"
        label="Period #2"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #2"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_2}
        onChange={onP2Change}
      />
      <TextField
        id="period-3"
        label="Period #3"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #3"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_3}
        onChange={onP3Change}
      />
      <TextField
        id="period-4"
        label="Period #4"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #4"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_4}
        onChange={onP4Change}
      />
      <TextField
        id="period-5"
        label="Period #5"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #5"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_5}
        onChange={onP5Change}
      />
      <TextField
        id="period-6"
        label="Period #6"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #6"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_6}
        onChange={onP6Change}
      />
      <TextField
        id="period-7"
        label="Period #7"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #7"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_7}
        onChange={onP7Change}
      />
      <TextField
        id="period-8"
        label="Period #8"
        style={{ margin: 8 }}
        placeholder="Enter the class for period #8"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={period_8}
        onChange={onP8Change}
      />
    </Box>;

    group = <Typography variant="caption" color="inherit">{info.group}</Typography>;

    display = settingsState ? schedule : settings;
  }

  var btnIcon = <ScheduleIcon />;
  if (items.length > 0 && settingsState) {
    btnIcon = <SettingsIcon />
  }

  return (
    <div className="App">
      <Container fixed>
        <Box pt={2}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleSettingsState}>
                {btnIcon}
              </IconButton>
              <Typography variant="subtitle2" className={classes.title}>
                {getToday()}
              </Typography>
              {group}
            </Toolbar>
          </AppBar>
          {display}
        </Box>
      </Container>
    </div>
  );
}

export default App;
