import React, { useState } from 'react';
import {
  Grid, IconButton, TextField, makeStyles, Paper, Slider, Toolbar, Tooltip, Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Map from '../map/Map';
import ShareFilter from './ShareFilter';
import { useTranslation } from '../LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    ...theme.typography.title,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    margin: theme.spacing(1.5),
    width: theme.dimensions.drawerWidthDesktop,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: 0,
    },
  },
  formControlLabel: {
    height: '100%',
    width: '100%',
    paddingRight: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareFilterContainer: {
    flex: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
  },
  sliderContainer: {
    padding: theme.spacing(2),
  },
}));

const SharePage = () => {
  const t = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [generatedUrl, setGeneratedUrl] = useState('');

  const userId = useSelector((state) => state.session.user.id);


  const deviceName = useSelector((state) => {
    if (selectedDeviceId) {
      const device = state.devices.items[selectedDeviceId];
      if (device) {
        return device.name;
      }
    }
    return null;
  });

  const handleSubmit = async (deviceId, from, to, headers) => {
    setSelectedDeviceId(deviceId);

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, deviceId, from, to }),
    });
    if (response.ok) {
      const res = await response.json();
      navigator.clipboard.writeText("HTTPS://Moovetrax.com/#/Temporary/" + res.shareUrl);
      setGeneratedUrl("HTTPS://Moovetrax.com/#/Temporary/" + res.shareUrl);
    }
  };

  return (
    <div className={classes.root}>
        <Map />
      <div className={classes.sidebar}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Paper elevation={3} square>
              <Toolbar disableGutters>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton onClick={() => history.push('/main')}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.share} color="primary">
                      Share Link
                    </Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} className={classes.shareFilterContainer} square>
              <ShareFilter handleSubmit={handleSubmit} fullScreen showOnly>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Generated URL"
                    value={generatedUrl}
                    onChange={(e) => setGeneratedUrl(e.target.value)}
                    variant="filled"
                  />
                </Grid>
              </ShareFilter>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SharePage;
