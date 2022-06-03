import { useMemo } from 'react';

export default (t) => useMemo(() => ({
  speedLimit: {
    name: t('deviceSpeedLimit'),
    type: 'string',
  },
}), [t]);
