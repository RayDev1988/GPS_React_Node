import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { positionsActions, devicesActions, sessionActions } from './store';
import { useEffectAsync } from './reactHelper';
import { useTranslation } from './LocalizationProvider';
import { prefixString } from './common/stringUtils';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { map } from "./map/Map";

// const client = new W3CWebSocket(`wss://${process.env.REACT_APP_URL_NAME}/websocket`);
const client = new W3CWebSocket(`wss://moovetrax.com/websocket`);
var authenticated;

const SocketController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const t = useTranslation();
  

  const devices = useSelector((state) => state.devices.items);
  authenticated = useSelector((state) => !!state.session.user);

  const socketRef = useRef();

  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.session.user);

  const connectSocket = () => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.devices) {
        dispatch(devicesActions.update(data.devices));
      }
      if (data.positions) {
        dispatch(positionsActions.update(data.positions));
      }
      if (data.events) {
        setEvents(data.events);
      }
    };
    client.onerror = () => {
      setTimeout(() => connectSocket(),  30* 1000);
    };
  };

  useEffectAsync(async () => {
    const response = await fetch('/api/server');
    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
    }
  }, []);

  useEffectAsync(async () => {
    if (authenticated) { 
      if(user.id !== 0){
        var url = `/api/devices`;
        if(!user.administrator) url = `/api/devicesByUserId/${user.id}`;
        const response = await fetch(url);
        if (response.ok) {
          const devices = await response.json();
          dispatch(devicesActions.refresh(devices));
          // if(devices.length){
          //   var bounds = [];
          //   devices.forEach((device) => { if(device.longitude && device.latitude) bounds.push([device.longitude, device.latitude])});
          //   if(bounds.length === 1) map.easeTo({center: bounds[0], zoom: 18});
          //   else map.fitBounds(bounds,{padding: { top: 50, bottom: 50, left: 50, right: 50 }});
          // }
        }
      }
      connectSocket();
      return () => {
        const socket = socketRef.current;
        if (socket) {
          socket.close();
        }
      };
    }
    const session = window.localStorage.getItem('session');
    if(!session) history.push('/login');
    else if(session) {
      const response = await fetch(`/api/session/${session}`);
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else {
        history.push('/login');
      }
    }
    return null;
  }, [authenticated]);

  useEffect(() => {
    setNotifications(events.map((event) => ({
      id: event.id,
      message: `${devices[event.deviceId]?.name}: ${event.type}`,
      show: true,
    })));
  }, [events, devices]);

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={notification.show}
          message={notification.message}
          autoHideDuration={10000}
          onClose={() => setEvents(events.filter((e) => e.id !== notification.id))}
        />
      ))}
    </>
  );
};

export default connect()(SocketController);

export const trueAuthenticated = () => {authenticated = true};