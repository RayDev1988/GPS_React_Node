import React, { useState } from 'react';

import {
  Button, Checkbox, FilledInput, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import AddDeviceDialog from './AddDeviceDialog';
import { useTranslation } from '../LocalizationProvider';
import { DevicesOther } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  removeButton: {
    marginRight: theme.spacing(1.5),
  },
}));

const EditDevicesView = ({ devices, setDevices, definitions }) => {
  const classes = useStyles();
  const t = useTranslation();
  console.log(definitions);

  const [addDialogShown, setAddDialogShown] = useState(false);

  const updateDevice = (id) => {
    const key = getDeviceKeyById(id, definitions);
    const newKey = Object.keys(devices).length;
    const definition = {[newKey]: definitions[key]};
    const updatedDevices = {...devices, ...definition};
    devices = updatedDevices;
    setDevices(updatedDevices);
  };

  const deleteDevice = (id) => {
    const key = getDeviceKeyById(id, devices);
    const updatedDevices = { ...devices };
    delete updatedDevices[key];
    setDevices(updatedDevices);
  };

  const getDeviceKeyById = (id, devices) => {
    var res;
    Object.keys(devices || []).forEach((key) => {
      if(devices[key].id === id) res = key;
    });
    return res;
  }

  const getDeviceName = (key) => {
    const definition = definitions[key];
    return definition ? definition.name : key;
  };

  const getDeviceType = (value) => {
    if (typeof value === 'number') {
      return 'number';
    } if (typeof value === 'boolean') {
      return 'boolean';
    }
    return 'string';
  };

  const convertToList = (devices) => {
    const booleanList = [];
    const otherList = [];
    var deviceList = [];
    if(Array.isArray(devices))  return devices;
    // {
    //   var key = 0;
    //   deviceList = devices.map((device) => 
    //     ({...device, key: key++})
    //   );
    //   return deviceList;
    // }
    // else return [devices[0]];
    Object.keys(devices || []).forEach((key) => {
      // const device = {...devices[key], key: key}
      deviceList.push(devices[key]);
      // const type = getDeviceType(value);
      // if (type === 'boolean') {
      //   booleanList.push({ key, value, type });
      // } else {
      //   otherList.push({ key, value, type });
      // }
    });
    return deviceList;
  };

  const handleAddResult = (key) => {
    setAddDialogShown(false);
    if(key) updateDevice(key);
    // if (definition) {
    //   switch (definition.type) {
    //     case 'number':
    //       updateDevice(definition.key, 0);
    //       break;
    //     case 'boolean':
    //       updateDevice(definition.key, false);
    //       break;
    //     default:
    //       updateDevice(definition.key, '');
    //       break;
    //   }
    // }
  };

  return (
    <>
      {convertToList(devices).map((device) => {
        
      // {devices.map((device) => {
        
        // if (type === 'boolean') {
          return (
            <Grid container direction="row" justify="space-between">
              {/* <FormControlLabel
                // control={(
                //   <Checkbox
                //     checked={value}
                //     onChange={(e) => updateDevice(key, e.target.checked)}
                //   />
                // )}
                label={getDeviceName(key)}
              /> */}
              {device.name}
              <IconButton className={classes.removeButton} onClick={() => deleteDevice(device.id)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          );
        // }
        // return (
        //   <FormControl variant="filled" margin="normal" key={key}>
        //     <InputLabel>{getDeviceName(key)}</InputLabel>
        //     <FilledInput
        //       type={type === 'number' ? 'number' : 'text'}
        //       value={value || ''}
        //       onChange={(e) => updateDevice(key, e.target.value)}
        //       endAdornment={(
        //         <InputAdornment position="end">
        //           <IconButton onClick={() => deleteDevice(key)}>
        //             <CloseIcon />
        //           </IconButton>
        //         </InputAdornment>
        //         )}
        //     />
        //   </FormControl>
        // );
      })}
      <Button
        size="large"
        variant="outlined"
        color="primary"
        onClick={() => setAddDialogShown(true)}
        startIcon={<AddIcon />}
        className={classes.addButton}
      >
        {t('sharedAdd')}
      </Button>
      <AddDeviceDialog
        open={addDialogShown}
        onResult={handleAddResult}
        definitions={definitions}
      />
    </>
  );
};

export default EditDevicesView;
