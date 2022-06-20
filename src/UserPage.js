import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';

import {
  Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, FormControlLabel, Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditItemView from './EditItemView';
import EditDevicesView from './devices/EditDevicesView';
import LinkField from './form/LinkField';
import { useTranslation } from './LocalizationProvider';
import useUserDevices from './devices/useUserDevices';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));
var allDevices = [];

const getDevices = async() => {
  await fetch('/api/devices')
  .then((response) => response.json())
  .then((res) => {
    allDevices = res;
  })
}

const UserPage = () => {
  const classes = useStyles();
  const t = useTranslation();  
  const [item, setItem] = useState();
  // getDevices();
  const { id } = useParams();

  const user = useSelector((state) => state.session.user);
  
  return (
    <EditItemView endpoint="users" item={item} setItem={setItem}>
      {item
        && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary>
              <Typography variant="subtitle1">
                Profile
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.name || ''}
                onChange={(event) => setItem({ ...item, name: event.target.value })}
                label={t('sharedName')}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.email || ''}
                onChange={(event) => setItem({ ...item, email: event.target.value })}
                label={t('userEmail')}
                variant="filled"
              />
              <TextField
                margin="normal"
                type="password"
                onChange={(event) => setItem({ ...item, password: event.target.value })}
                label={t('userPassword')}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label={t('sharedPhone')}
                variant="filled"
              />
              {user.administrator &&
              (<>
                <FormControlLabel
                  control={<Checkbox checked={item.administrator} onChange={(event) => setItem({ ...item, administrator: event.target.checked })} />}
                  label="Administrator"
                />
                {id && getDevices() &&
                (<>
                  <Typography variant="subtitle1">
                    Devices
                  </Typography>
                  <EditDevicesView
                    devices={item.devices}
                    setDevices={(devices) => setItem({ ...item, devices })}
                    definitions={allDevices}
                  />
                </>)}
              </>
              )}
            </AccordionDetails>
          </Accordion>
          {/* <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedPreferences')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label={t('sharedPhone')}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.poiLayer || ''}
                onChange={(event) => setItem({ ...item, poiLayer: event.target.value })}
                label={t('mapPoiLayer')}
                variant="filled"
              /> 
            </AccordionDetails>
          </Accordion>
          {user.administrator && <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                Devices
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <EditDevicesView
                devices={item.devices}
                setDevices={(devices) => setItem({ ...item, devices })}
                definitions={allDevices}
              />
            </AccordionDetails>
          </Accordion>}
          {/* {item.id
            && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('sharedConnections')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  margin="normal"
                  endpointAll="/api/devices?all=true"
                  endpointLinked={`/api/devices?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="deviceId"
                  label={t('deviceTitle')}
                  variant="filled"
                />
                <LinkField
                  margin="normal"
                  endpointAll="/api/groups?all=true"
                  endpointLinked={`/api/groups?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="groupId"
                  label={t('settingsGroups')}
                  variant="filled"
                />
              </AccordionDetails>
            </Accordion>
          )} */}
        </>
        )}
    </EditItemView>
  );
};

export default UserPage;
