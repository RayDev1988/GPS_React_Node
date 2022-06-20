import { useMemo } from 'react';

export default (t) => useMemo(() => ({
  speedLimit: {
    name: t('deviceSpeedLimit'),
    type: 'string',
  },
  'report.ignoreOdometer': {
    name: t('deviceReportIgnoreOdometer'),
    type: 'boolean',
  },
}), [t]);
