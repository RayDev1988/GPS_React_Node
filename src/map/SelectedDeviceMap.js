import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { map } from './Map';

var flag = false;
const SelectedDeviceMap = () => {

  const user = useSelector((state) => state.session.user);
  const mapCenter = useSelector((state) => {
    if (state.devices.selectedId) {
      const position = state.positions.items[state.devices.selectedId] || null;
      if (position) {
        return { deviceId: state.devices.selectedId, position: [position.longitude, position.latitude] };
      }
    }
    return null;
  });

  useEffect(() => {
    if (mapCenter) {
      if(!user.id && !flag) map.easeTo({ center: mapCenter.position , zoom: 18 });
      else if(!(!user.id && flag)) map.easeTo({ center: mapCenter.position });
      flag = true;
      // map.easeTo({ center: mapCenter.position , zoom: 18 });
    }
  }, [mapCenter]);

  return null;
};

export default SelectedDeviceMap;
