import { useMemo } from 'react';

export default (t) => useMemo(() => ({
  notificationTokens: {
    name: t('deviceNotificationTokens'),
    type: 'string',
  },
  'web.liveRouteLength': {
    name: t('deviceWebLiveRouteLength'),
    type: 'number',
  },
  'web.selectZoom': {
    name: t('deviceWebSelectZoom'),
    type: 'number',
  },
  'web.maxZoom': {
    name: t('deviceWebMaxZoom'),
    type: 'number',
  },
  'ui.disableEvents': {
    name: t('deviceUiDisableEvents'),
    type: 'boolean',
  },
  'ui.disableVehicleFetures': {
    name: t('deviceUiDisableVehicleFetures'),
    type: 'boolean',
  },
  'ui.disableDrivers': {
    name: t('deviceUiDisableDrivers'),
    type: 'boolean',
  },
  'ui.disableComputedDevices': {
    name: t('deviceUiDisableComputedDevices'),
    type: 'boolean',
  },
  'ui.disableCalendars': {
    name: t('deviceUiDisableCalendars'),
    type: 'boolean',
  },
  'ui.disableMaintenance': {
    name: t('deviceUiDisableMaintenance'),
    type: 'boolean',
  },
  'ui.hidePositionDevices': {
    name: t('deviceUiHidePositionDevices'),
    type: 'string',
  },
  distanceUnit: {
    name: t('settingsDistanceUnit'),
    type: 'string',
  },
  speedUnit: {
    name: t('settingsSpeedUnit'),
    type: 'string',
  },
  volumeUnit: {
    name: t('settingsVolumeUnit'),
    type: 'string',
  },
  timezone: {
    name: t('sharedTimezone'),
    type: 'string',
  },
}), [t]);
