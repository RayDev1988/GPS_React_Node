import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, Paper, BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import MapIcon from '@material-ui/icons/Map';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';

import { sessionActions } from '../store';
import { useTranslation } from '../LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: theme.spacing(0),
    left: '0px',
    width: '100%',
    position: 'fixed',
    zIndex: 1301,
    [theme.breakpoints.up('lg')]: {
      left: theme.spacing(1.5),
      bottom: theme.spacing(1.5),
      width: theme.dimensions.drawerWidthDesktop,
    },
  },
}));

const BottomMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const t = useTranslation();

  const dispatch = useDispatch();

  const handleSelection = (_, value) => {
    switch (value) {
      case 1:
        history.push('/replay');
        break;
      case 2:
        history.push('/reports/commands');
        break;
      case 3:
        history.push('/settings/links');
        break;
      case 4:
        window.localStorage.removeItem('session');
        dispatch(sessionActions.updateUser(null));
        history.push('/login');
        break;
      default:
        break;
    }
  };

  return (
    <Paper square elevation={4} className={classes.container}>
      <BottomNavigation
        value={0}
        onChange={handleSelection}
        showLabels
      >
        <BottomNavigationAction label={t('mapTitle')} icon={<MapIcon />} />
        <BottomNavigationAction label={t('reportReplay')} icon={<ReplayIcon />} />
        <BottomNavigationAction label={t('reportTitle')} icon={<DescriptionIcon />} />
        <BottomNavigationAction label={t('settingsTitle')} icon={<ShuffleIcon />} />
        <BottomNavigationAction label={t('loginLogout')} icon={<LogoutIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomMenu;
