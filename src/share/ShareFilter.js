import React, { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Button, TextField, Grid, Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from '../LocalizationProvider';

const ShareFilter = ({ children, handleSubmit, showOnly }) => {
  const t = useTranslation();

  const devices = useSelector((state) => Object.values(state.devices.items));
  const [deviceId, setDeviceId] = useState();
  const [from, setFrom] = useState(moment());
  const [to, setTo] = useState(moment().add(1, 'day'));

  const handleClick = (json) => {
    const accept = json ? 'application/json' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    handleSubmit(
      deviceId,
      from.toISOString(),
      to.toISOString(),
      { Accept: accept },
    );
  };

  return (
    <Grid container spacing={1} justifyContent="flex-start">
      <Grid item xs={12} sm={4}>
        <FormControl variant="filled" fullWidth>
          <InputLabel>Devices</InputLabel>
          <Select value={deviceId} onChange={(e) => setDeviceId(e.target.value)}>
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          variant="filled"
          label="From"
          type="datetime-local"
          value={from.format(moment.HTML5_FMT.DATETIME_LOCAL)}
          onChange={(e) => setFrom(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          variant="filled"
          label="To"
          type="datetime-local"
          value={to.format(moment.HTML5_FMT.DATETIME_LOCAL)}
          onChange={(e) => setTo(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
          fullWidth
        />
      </Grid>
      {children}
      <Grid item xs={12} sm={4}>
        <Button
          onClick={() => handleClick(true)}
          variant="outlined"
          color="secondary"
          fullWidth
          disabled={!deviceId}
        >
          Generate
        </Button>
      </Grid>
    </Grid>
  );
};

export default ShareFilter;
