const readline = require('readline');
const { SerialPort } = require('serialport');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  autoOpen: true,
  encoding: 'hex'
});

r1.on('line', line => {
  port.write(Buffer.from(line, 'hex'), err => {
    if(err) {
      return console.log('Error on write:', err.message);
    }
  });
  console.log('message:', line, 'sent');
  console.log('Data:', port.read());
})