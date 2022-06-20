import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import { formatBoolean } from '../common/formatter';
import OptionsLayout from '../settings/OptionsLayout';
import { useTranslation } from '../LocalizationProvider';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

var users;

const getUsers = async () => {
  const response = await fetch('/api/users');
  if (response.ok) {
    users = await response.json();
  }
};

const LinksView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const t = useTranslation();

  const user = useSelector((state) => state.session.user);
  const [items, setItems] = useState([]);
  getUsers();


  useEffectAsync(async () => {
    var url;
    if(user.administrator) url = `/api/links`;
    else url = `/api/userLinks/${user.id}`;
    const response = await fetch(url);
    if (response.ok) {
      setItems(await response.json());
    }
  }, [updateTimestamp]);

  const devices = useSelector((state) => state.devices.items);

  

  const getDeviceName = (deviceId) => {
    for (const key in devices) if (devices.hasOwnProperty(key) && devices[key].id === deviceId) return devices[key].name;
  };
  const getUserName = (userId) => {
    for (const key in users) if (users.hasOwnProperty(key) && users[key].id === userId) return users[key].name;
  };

  const [value, setValue] = useState('all');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const current = moment();

  return (
    <>
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="old" control={<Radio />} label="Old" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
        <FormControlLabel value="future" control={<Radio />} label="Future" />
      </RadioGroup>
    </FormControl>

    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.columnAction} />
            <TableCell>User</TableCell>
            <TableCell>Device</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => 
            { if((moment(item.from) < current && current < moment(item.to) && value === "active") || 
            (moment(item.from) < current && moment(item.to) < current && value === "old") || 
            (current < moment(item.from) && current < moment(item.to) && value === "future") || 
            value === "all" )
              return (
                <TableRow key={item.id}>
                  <TableCell className={classes.columnAction} padding="none">
                    <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{getUserName(item.userId)}</TableCell>
                  <TableCell>{getDeviceName(item.deviceId)}</TableCell>
                  <TableCell>{moment(item.from).format('LLL')}</TableCell>
                  <TableCell>{moment(item.to).format('LLL')}</TableCell>
                  <TableCell>{item.distance}</TableCell>
                  <TableCell>{ "HTTPS://Moovetrax.com/#/Temporary/" + item.shareUrl}</TableCell>
                </TableRow>);
            else return (<></>);
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

const LinksPage = () => {
  return (
    <>
    <OptionsLayout>
      <EditCollectionView content={LinksView} editPath="/share" endpoint="links" />
    </OptionsLayout>
    </>
  );
};

export default LinksPage;
