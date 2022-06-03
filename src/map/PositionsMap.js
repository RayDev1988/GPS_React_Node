import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import maplibregl from 'maplibre-gl';
import { Provider, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { map } from './Map';
import store from '../store';
import StatusView from './StatusView';
import theme from '../theme';
import moment from 'moment';

const PositionsMap = ({ positions }) => {
  const id = 'positions';
  const clusters = `${id}-clusters`;

  const history = useHistory();
  const devices = useSelector((state) => state.devices.items);

  const deviceColor = (device) => {
    // switch (device.status) {
    //   case 'online':
    //     return 'green';
    //   case 'offline':
    //     return 'red';
    //   default:
    //     return 'gray';
    // }
    return device.color;
  };

  const createFeature = (devices, position) => {
    const device = devices[position.deviceId];
    let name = device.name;
    if(moment().diff(moment(device.lastSeen), "seconds") < 60) name = name + " : " + position.speed + "mph";
    return {
      deviceId: position.deviceId,
      name: name,
      category: device.category || 'default',
      color: deviceColor(device),
    };
  };
  

  const onMouseEnter = () => map.getCanvas().style.cursor = 'pointer';
  const onMouseLeave = () => map.getCanvas().style.cursor = '';

  const onMarkerClick = useCallback(async(event) => {
    const feature = event.features[0];
    const coordinates = feature.geometry.coordinates.slice();
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var apiKey = "AIzaSyBaDSA1OGhiJ3D3wU4fX1JYPSjUdUEbrjg";

    var latlng = String(event.lngLat.lat) + ',' + String(event.lngLat.lng);
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
            deviceId={feature.properties.deviceId}
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
      .setLngLat(coordinates)
      .addTo(map);
  }, [history]);

  const onClusterClick = (event) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: [clusters],
    });
    const clusterId = features[0].properties.clusterid;
    map.getSource(id).getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (!error) {
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom,
        });
      }
    });
  };

  useEffect(() => {
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    map.addLayer({
      id,
      type: 'symbol',
      source: id,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': '{category}-{color}',
        'icon-allow-overlap': true,
        'text-field': '{name}',
        'text-allow-overlap': true,
        'text-anchor': 'bottom',
        'text-offset': [0, -2],
        'text-font': ['Roboto Regular'],
        'text-size': 12,
      },
      paint: {
        'text-halo-color': 'white',
        'text-halo-width': 1,
      },
    });
    map.addLayer({
      id: clusters,
      type: 'symbol',
      source: id,
      filter: ['has', 'point_count'],
      layout: {
        'icon-image': 'background',
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-size': 14,
      },
    });

    map.on('mouseenter', id, onMouseEnter);
    map.on('mouseleave', id, onMouseLeave);
    map.on('mouseenter', clusters, onMouseEnter);
    map.on('mouseleave', clusters, onMouseLeave);
    map.on('click', id, onMarkerClick);
    map.on('click', clusters, onClusterClick);

    return () => {
      Array.from(map.getContainer().getElementsByClassName('maplibregl-popup')).forEach((el) => el.remove());

      map.off('mouseenter', id, onMouseEnter);
      map.off('mouseleave', id, onMouseLeave);
      map.off('mouseenter', clusters, onMouseEnter);
      map.off('mouseleave', clusters, onMouseLeave);
      map.off('click', id, onMarkerClick);
      map.off('click', clusters, onClusterClick);

      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getLayer(clusters)) {
        map.removeLayer(clusters);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }
    };
  }, [onMarkerClick]);

  useEffect(() => {
    map.getSource(id).setData({
      type: 'FeatureCollection',
      features: positions.filter((it) => devices.hasOwnProperty(it.deviceId)).map((position) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [position.longitude, position.latitude],
        },
        properties: createFeature(devices, position),
      })),
    });
  }, [devices, positions]);

  return null;
};

export default PositionsMap;
