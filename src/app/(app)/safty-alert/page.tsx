import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000'||'');

const SafetyAlerts = () => {
  useEffect(() => {
    socket.on('alert', (message:any) => {
      console.log('Emergency Alert:', message);
    });
  }, []);
  return <div>Safety Alerts</div>;
};
export default SafetyAlerts;
