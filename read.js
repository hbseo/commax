const { SerialPort } = require('serialport');
const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 9600, 
  parity: 'none',
  stopBits: 1,
  autoOpen: true,
  encoding: 'hex'
});

let packets = {};

port.on('data', data => {
  if(!packets[data]) {
    packets[data] = 1;
    console.log('Data:', data);
  }
});