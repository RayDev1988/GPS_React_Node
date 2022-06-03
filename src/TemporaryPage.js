import React, { useState, useEffect } from 'react';
import { useHistory , useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffectAsync } from './reactHelper';
import {
  makeStyles, Paper, Toolbar, TextField, IconButton, Button,
} from '@material-ui/core';

import { positionsActions, devicesActions, sessionActions } from './store';

import { trueAuthenticated } from './SocketController';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DevicesList from './DevicesList';
import Map, {map} from './map/Map';
import SelectedDeviceMap from './map/SelectedDeviceMap';
import AccuracyMap from './map/AccuracyMap';
import GeofenceMap from './map/GeofenceMap';
import CurrentPositionsMap from './map/CurrentPositionsMap';
import CurrentLocationMap from './map/CurrentLocationMap';
import BottomMenu from './components/BottomMenu';
import { useTranslation } from './LocalizationProvider';
import PoiMap from './map/PoiMap';
import MapPadding from './map/MapPadding';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    margin: theme.spacing(1.5),
    width: theme.dimensions.drawerWidthDesktop,
    bottom: 56,
    zIndex: 1301,
    transition: 'transform .5s ease',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: 0,
    },
  },
  sidebarCollapsed: {
    transform: `translateX(-${theme.dimensions.drawerWidthDesktop})`,
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
      transform: 'translateX(-100vw)',
    },
  },
  paper: {
    zIndex: 1,
  },
  toolbar: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    '& > *': {
      margin: theme.spacing(0, 1),
    },
  },
  deviceList: {
    flex: 1,
  },
  sidebarToggle: {
    position: 'absolute',
    left: theme.spacing(1.5),
    top: theme.spacing(3),
    borderRadius: '0px',
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
      left: 0,
    },
  },
  sidebarToggleText: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  sidebarToggleBg: {
    backgroundColor: 'white',
    color: '#777777',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

const TemporaryPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const t = useTranslation();
  const dispatch = useDispatch();

  const { shareUrl } = useParams();
  const [authenticated , setAuthenticated] = useState(false);

  const refreshAll = async(deviceId) => {
    const responseSession = await fetch(`/api/session`);
    if (responseSession.ok) {
        const user = await responseSession.json();
        dispatch(sessionActions.updateUser({...user, shareUrl}));
    }
    
    const responseDevice = await fetch(`/api/devices/${deviceId}`);
    if (responseDevice.ok) {
        const device = await responseDevice.json();
        dispatch(devicesActions.refresh([device]));
        dispatch(devicesActions.select({id: device.id}));
    }
    setAuthenticated(true);
    trueAuthenticated();
    history.push("/temporary/" +shareUrl);
  }

  useEffectAsync(async () => {
    if (shareUrl) {
      const response = await fetch(`/api/links/${shareUrl}`);
      if (response.ok) {
          const link = await response.json();
          refreshAll(link.deviceId);
      }
    } else {
      
    }
  }, [shareUrl]);

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isPhone = useMediaQuery(theme.breakpoints.down('xs'));

  const [searchKeyword, setSearchKeyword] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const handleClose = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => setCollapsed(isTablet), [isTablet]);

  return (
    <div className={classes.root}>
      {authenticated && <Map>
        {!isTablet && <MapPadding left={parseInt(theme.dimensions.drawerWidthDesktop, 10)} />}
        {/* <CurrentLocationMap />
        <GeofenceMap />
        <AccuracyMap /> */}
        <CurrentPositionsMap />
        <SelectedDeviceMap />
        <PoiMap />
      </Map>}
    </div>
  );
};

export default TemporaryPage;
