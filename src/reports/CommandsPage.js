import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

import ReportFilter from './ReportFilter';
import ReportLayout from './ReportLayout';
import SelectField from '../form/SelectField';

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
getUsers();

const CommandsView = ({ updateTimestamp, selectedDevice }) => {
  const classes = useStyles();
  const t = useTranslation();

  const user = useSelector((state) => state.session.user);
  const [items, setItems] = useState([]);

  useEffectAsync(async () => {
    var url = "/api/commands";
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

  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Device</TableCell>
            <TableCell>Command</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>When</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => 
                (selectedDevice ==="All" || selectedDevice === getDeviceName(item.deviceId)) && <TableRow key={item.id}>
                  <TableCell>{getUserName(item.userId)}</TableCell>
                  <TableCell>{getDeviceName(item.deviceId)}</TableCell>
                  <TableCell>{item.commandType}</TableCell>
                  <TableCell>{item.count && (item.commandType === "Overspeed" ? item.count + "mph" : item.count + "mile")}</TableCell>
                  <TableCell>{moment(item.createdAt).format('LLL')}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

const CommandsPage = () => {

  const { id } = useParams();
  const devices = useSelector((state) => state.devices.items);
  var defaultSelect = "All";

  if(id) {
    for (const key in devices){
      if(devices[key].id === Number(id)) {
        defaultSelect = devices[key].name;
        break;
      }
    }
  }
  
  const [selectedDevice, setSelectedDevice] = useState(defaultSelect);
  const getSelectDevices = () => {
    var items = [];
    items.push({id: "All", name: "All"});
    for (const key in devices) items.push({id: devices[key].name, name: devices[key].name});
    return items;
  }

  return (
    <>
    <ReportLayout>
      {/* <EditCollectionView content={CommandsView} editPath="/share" endpoint="commands" /> */}
      <SelectField
        margin="normal"
        value={selectedDevice}
        emptyValue={null}
        onChange={(event) => setSelectedDevice(event.target.value)}
        data={getSelectDevices}
        label='Device'
        variant="filled"
      />
      <CommandsView selectedDevice={selectedDevice}/>
    </ReportLayout>
    </>
  );
};

export default CommandsPage;
