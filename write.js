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
  autoOpen: false,
  encoding: 'hex'
});

rl.on('line', line => {
  port.on('open', () => {
    port.write(Buffer.from(line, 'hex'), err => {
      if(err) {
        return console.log('Error on write:', err.message);
      }
    });
  });
  console.log('Sent:'+ line);
});

port.on('error', err => {
  console.log('Error:', err.message);
});

port.on('data', data => {
  console.log('Received:', data.toString('hex'));
});

port.on('readable', () => {
  console.log('Data:', port.read());
});