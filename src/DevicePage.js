import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, FormControlLabel, Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditItemView from './EditItemView';
import EditAttributesView from './attributes/EditAttributesView';
import SelectField from './form/SelectField';
import deviceCategories from './common/deviceCategories';
import LinkField from './form/LinkField';
import { prefixString } from './common/stringUtils';
import { useTranslation } from './LocalizationProvider';
import useDeviceAttributes from './attributes/useDeviceAttributes';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));

const DevicePage = () => {
  const classes = useStyles();
  const t = useTranslation();
  const { id } = useParams();

  const deviceAttributes = useDeviceAttributes(t);
  const user = useSelector((state) => state.session.user);
  const [item, setItem] = useState();
  const randomStr = (len) => {
    var ans = '';
    const arr = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (var i = len; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  return (
    <EditItemView endpoint="devices" item={item} setItem={setItem}>
      {item
        && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary>
              <Typography variant="subtitle1">
                GPS
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                required
                margin="normal"
                value={item.name || ''}
                onChange={(event) => setItem({ ...item, name: event.target.value })}
                label="CAR Name"
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontStyle: 'italic',
                  } }
                } 
              />
              <TextField
                required
                margin="normal"
                value={item.uniqueId || ''}
                onChange={(event) => setItem({ ...item, uniqueId: event.target.value })}
                label="GPS ID"
                variant="filled"
                disabled={id && !user.administrator && "true"}
                InputLabelProps={{
                  style: {
                    fontStyle: 'italic',
                  } }
                } 
              />
              <TextField
                margin="normal"
                value={item.vin || ''}
                onChange={(event) => setItem({ ...item, vin: event.target.value })}
                label="VIN"
                variant="filled"
                disabled={id && !user.administrator && "true"}
              />
              <TextField
                margin="normal"
                value={Number(item.odometer).toFixed(0) || ''}
                onChange={(event) => setItem({ ...item, odometer: event.target.value })}
                label="Odometer"
                variant="filled"
              />
              {id && <TextField
                margin="normal"
                value={item.iccid || ''}
                // onChange={(event) => setItem({ ...item, iccid: event.target.value })}
                label="ICCID"
                variant="filled"
                disabled="true"
              />}
              <TextField
                margin="normal"
                value={item.make || ''}
                onChange={(event) => setItem({ ...item, make: event.target.value })}
                label={t('deviceMake')}
                variant="filled"
              />
              <TextField
                margin="normal"
                value={item.model || ''}
                onChange={(event) => setItem({ ...item, model: event.target.value })}
                label={t('deviceModel')}
                variant="filled"
              />
              <SelectField
                margin="normal"
                value={item.color || 'Black'}
                emptyValue={null}
                onChange={(event) => setItem({ ...item, color: event.target.value })}
                data={[{ id: 'Black', name: 'Black' }, { id: 'white', name: 'White' }, { id: 'Brown', name: 'Brown' }, { id: 'Gray', name: 'Gray' }, { id: 'Red', name: 'Red' }, { id: 'Blue', name: 'Blue' }, { id: 'Green', name: 'Green' }, { id: 'Gold', name: 'Gold' }, { id: 'Silver', name: 'Silver' } ]}
                label='color'
                variant="filled"
              />
              <SelectField
                margin="normal"
                value={item.category || 'Default'}
                emptyValue={null}
                onChange={(event) => setItem({ ...item, category: event.target.value })}
                data={deviceCategories.map((category) => ({
                  id: category,
                  name: category,
                }))}
                label={t('deviceCategory')}
                variant="filled"
              />
              {id && 
              <>
              <TextField
                margin="normal"
                value={item.fuel}
                // onChange={(event) => setItem({ ...item, maxFuel: event.target.value })}
                label='Current Fuel'
                variant="filled"
                disabled="true"
              />
              <Button variant="contained" onClick={() => {setItem({ ...item, maxFuel: item.fuel })}}>Full</Button>
              <Button variant="contained" onClick={() => {setItem({ ...item, minFuel: item.fuel })}}>Quarter</Button>
              </>
              }
              {id &&
              <>
              <TextField
                margin="normal"
                value={item.apiKey || ''}
                label="Api-Key"
                variant="filled"
                disabled="true"
              />
              <Button variant="contained" onClick={() => {setItem({ ...item, apiKey: randomStr(16) })}}>Generate</Button>
              </>
              }

              <FormControlLabel
                control={<Checkbox checked={item.isDoubleLock} onChange={(event) => setItem({ ...item, isDoubleLock: event.target.checked })} />}
                label="Double Pulse Lock"
              />

              <FormControlLabel
                control={<Checkbox checked={item.isDoubleUnlock} onChange={(event) => setItem({ ...item, isDoubleUnlock: event.target.checked })} />}
                label="Double Pulse Unlock"
              />
              
              {id && <FormControlLabel
                control={<Checkbox checked={item.disabled} onChange={(event) => setItem({ ...item, disabled: event.target.checked })} />}
                label={t('sharedDisabled')}
                disabled={id && !user.administrator && "true"}
              />}
            </AccordionDetails>
          </Accordion>
        </>
        )}
    </EditItemView>
  );
};

export default DevicePage;
