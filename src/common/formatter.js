import moment from 'moment';

export const formatBoolean = (value, t) => (value ? t('sharedYes') : t('sharedNo'));

export const formatNumber = (value, precision = 1) => Number(value.toFixed(precision));

export const formatDate = (value, format = 'YYYY-MM-DD HH:mm') => moment(value).format(format);

export const formatPosition = (value, key, t) => {
  if (value !== null && typeof value === 'object') {
    value = value[key];
  }
  switch (key) {
    case 'createdAt':
    case 'deviceTime':
    case 'serverTime':
    case 'eventTime':
      return moment(value).format('LLL');
    case 'latitude':
    case 'longitude':
      return value.toFixed(5);
    case 'speed':
    case 'direction': {
      var direct = "";
      if(value <= 22.5 ) direct = "North";
      else if(value <= 67.5 ) direct = "North East";
      else if(value <= 112.5 ) direct = "East";
      else if(value <= 157.5 ) direct = "South East";
      else if(value <= 202.5 ) direct = "South";
      else if(value <= 247.5 ) direct = "South West";
      else if(value <= 292.5 ) direct = "West";
      else if(value <= 337.5 ) direct = "North West";
      else direct = "North";
      return direct;
      // return value.toFixed(1);
    }
    case 'batteryLevel':
      return `${value}%`;
    default:
      if (typeof value === 'number') {
        return formatNumber(value);
      } if (typeof value === 'boolean') {
        return formatBoolean(value, t);
      }
      return value;
  }
};

export const formatDistance = (value, unit, t) => {
  switch (unit) {
    case 'km':
      return `${(value * 0.1).toFixed(2)} ${t('sharedKm')}`;
    case 'nmi':
      return `${(value * 0.539957).toFixed(2)} ${t('sharedNmi')}`;
    case 'mi':
    default:
      return `${(value * 1).toFixed(0)} ${t('sharedMi')}`;
  }
};

export const formatSpeed = (value, unit, t) => {
  switch (unit) {
    case 'kmh':
      return `${(value * 1.852).toFixed(2)} ${t('sharedKmh')}`;
    case 'kn':
      return `${(value * 1).toFixed(2)} ${t('sharedKn')}`;
    case 'mph':
    default:
      return `${(value).toFixed(2)} ${t('sharedMph')}`;
      // return `${(value * 1.15078).toFixed(2)} ${t('sharedMph')}`;
  }
};


export const formatVolume = (value, unit, t) => {
  switch (unit) {
    case 'impGal':
      return `${(value / 4.546).toFixed(2)} ${t('sharedGallonAbbreviation')}`;
    case 'usGal':
      return `${(value / 3.785).toFixed(2)} ${t('sharedGallonAbbreviation')}`;
    case 'ltr':
    default:
      return `${(value / 1).toFixed(2)} ${t('sharedLiterAbbreviation')}`;
  }
};

export const formatHours = (value) => moment.duration(value).humanize();

export const formatCoordinate = (key, value, unit) => {
  let hemisphere;
  let degrees;
  let minutes;
  let seconds;

  if (key === 'latitude') {
    hemisphere = value >= 0 ? 'N' : 'S';
  } else {
    hemisphere = value >= 0 ? 'E' : 'W';
  }

  switch (unit) {
    case 'ddm':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = (value - degrees) * 60;
      return `${degrees}° ${minutes.toFixed(6)}' ${hemisphere}`;
    case 'dms':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = Math.floor((value - degrees) * 60);
      seconds = Math.round((value - degrees - minutes / 60) * 3600);
      return `${degrees}° ${minutes}' ${seconds}" ${hemisphere}`;
    default:
      return `${value.toFixed(6)}°`;
  }
};

export const getStatusColor = (status) => {
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

export const getBatteryStatus = (batteryLevel) => {
  if (batteryLevel >= 70) {
    return 'green';
  }
  if (batteryLevel > 30) {
    return 'gray';
  }
  return 'red';
};
