import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import { ReactComponent as IgnitionIcon } from '../public/images/ignition.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

import store, { devicesActions } from './store';
import EditCollectionView from './EditCollectionView';
import { useEffectAsync } from './reactHelper';
import { formatPosition } from './common/formatter';
import { getDevices, getPosition } from './common/selectors';
import { useTranslation } from './LocalizationProvider';
import StatusView from './map/StatusView';
import theme from './theme';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { map } from './map/Map';
import maplibregl from 'maplibre-gl';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: '100%',
  },
  listInner: {
    position: 'relative',
    margin: theme.spacing(1.5, 0),
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
  listItem: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  batteryText: {
    fontSize: '0.75rem',
    fontWeight: 'normal',
    lineHeight: '0.875rem',
  },
  green: {
    color: theme.palette.common.Green,
  },
  red: {
    color: theme.palette.common.Red,
  },
  gray: {
    color: theme.palette.common.Gray,
  },
  indicators: {
    lineHeight: 1,
  },
}));

const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'green';
    case 'offline':
      return 'red';
    case 'unknown':
    default:
      return 'gray';
  }
};

const getBatteryStatus = (batteryLevel) => {
  if (batteryLevel >= 70) {
    return 'green';
  }
  if (batteryLevel > 30) {
    return 'gray';
  }
  return 'red';
};

const DeviceRow = ({ data, index, style }) => {

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const { items } = data;
  const item = items[index];
  const position = useSelector(getPosition(item.id));
  const showIgnition = position?.attributes.hasOwnProperty('ignition') && position.attributes.ignition;

  return (
    <div style={style}>
      <ListItem button key={item.id} className={classes.listItem} onClick={async() => {
        dispatch(devicesActions.select(item));
        if(item.status === 'online'){
        var apiKey = "AIzaSyBaDSA1OGhiJ3D3wU4fX1JYPSjUdUEbrjg";
        var latlng = String(position.latitude) + ',' + String(position.longitude);
        var address;
        const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=true&key=" + apiKey);
        if(response.ok){
          var res = await response.json();
          var comp = res.results[0].address_components;
          address = comp[0].long_name + " " + comp[1].long_name + ", " + comp[3].long_name;
        }
        const placeholder = document.createElement('div');
        ReactDOM.render(
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <StatusView
                deviceId={item.id}
                address={address}
                onShowDetails={(positionId) => history.push(`/position/${positionId}`)}
                onShowHistory={() => history.push('/replay')}
                onShareLink={() => history.push('/share')}
                onEditClick={(deviceId) => history.push(`/device/${deviceId}`)}
                onLogClick={(deviceId) => history.push(`/reports/event/${deviceId}`)}
              />
            </ThemeProvider>
          </Provider>,
          placeholder,
        );
        new maplibregl.Popup({
          offset: 25,
          anchor: 'top',
        })
          .setDOMContent(placeholder)
          .setLngLat([position.longitude, position.latitude])
          .addTo(map);
      }}}>
        <ListItemAvatar>
          <Avatar>
            <img className={classes.icon} src={`images/icon/${item.category || 'Default'}.svg`} alt="" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.status} classes={{ secondary: classes[getStatusColor(item.status)] }} />
        <ListItemSecondaryAction className={classes.indicators}>
          {position && (
          <Grid container direction="row" alignItems="center" alignContent="center" spacing={2}>
            {showIgnition && (
            <Grid item>
              <SvgIcon component={IgnitionIcon} />
            </Grid>
            )}
            {/* {position.attributes.hasOwnProperty('batteryLevel') && (
            <Grid item container xs alignItems="center" alignContent="center">
              <Grid item>
                <span className={classes.batteryText}>{formatPosition(position.attributes.batteryLevel, 'batteryLevel', t)}</span>
              </Grid>
              <Grid item>
                <BatteryFullIcon className={classes[getBatteryStatus(position.attributes.batteryLevel)]} />
              </Grid>
            </Grid>
            )} */}
          </Grid>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

const DeviceView = ({ updateTimestamp, onMenuClick, filter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listInnerEl = useRef(null);
  const user = useSelector((state) => state.session.user);
  const items = useSelector(getDevices);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    setFilteredItems(
      filter.trim().length > 0
        ? items.filter((item) => `${item.name} ${item.uniqueId} ${item.vin} ${item.iccid}`.toLowerCase().includes(filter?.toLowerCase()))
        : items,
    );
  }, [filter, items]);

  if (listInnerEl.current) {
    listInnerEl.current.className = classes.listInner;
  }

  useEffectAsync(async () => {
    var url = `/api/devices`;
    if(!user.administrator) url = `/api/devicesByUserId/${user.id}`;
    const response = await fetch(url);
    if (response.ok) {
      const devices = await response.json();
      dispatch(devicesActions.refresh(devices));
      if(devices.length) {
        if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          map.setPadding({left: parseInt(theme.dimensions.drawerWidthDesktop, 10)});
        }
        var points = [];
        devices.forEach((device) => { if(device.longitude && device.latitude) points.push([device.longitude, device.latitude])});
        if(points.length === 1) map.easeTo({center: points[0], zoom: 18});
        else {
          var coordinates = points;
          var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
          }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
          map.fitBounds(bounds,{padding: { top: 50, bottom: 50, left: 50, right: 50 }});
        }
      }
    }
  }, [updateTimestamp]);

  
  return (
    <AutoSizer className={classes.list}>
      {({ height, width }) => (
        <List disablePadding>
          <FixedSizeList
            width={width}
            height={height}
            itemCount={filteredItems.length}
            itemData={{ items: filteredItems, onMenuClick }}
            itemSize={72}
            overscanCount={10}
            innerRef={listInnerEl}
          >
            {DeviceRow}
          </FixedSizeList>
        </List>
      )}
    </AutoSizer>
  );
};

const DevicesList = ({ filter }) => (
  <EditCollectionView content={DeviceView} editPath="/device" endpoint="devices" disableAdd filter={filter} />
);

export default DevicesList;
