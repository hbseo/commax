const { SerialPort } = require('serialport');

const LIGHT_1_TX = ['3101010000000033', '3101000000000032'];
const LIGHT_1_RX = ['b1010100000000b3', 'b1000100000000b2'];
const LIGHT_2_TX = ['3102010000000034', '3102000000000033'];
const LIGHT_2_RX = ['b1010200000000b4', 'b1000200000000b3'];
const LIGHT_3_TX = ['3103010000000035', '3103000000000034'];
const LIGHT_3_RX = ['b1010300000000b5', 'b1000300000000b4'];

const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  autoOpen: false,
  encoding: 'hex'
});

const switchLight = (tx, rx) => {
  open();

  setTimeout(() => {
    console.log('server error');
    process.exit(0);
  }, 7000);

  
  setInterval(() => {
    write(tx);
  }, 2000);
  read(rx);
  error();
}

const open = () => {
  port.open(err => {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
    console.log('Open port');
  });
}

const write = (packet) => {
  port.write(Buffer.from(packet, 'hex'), err => {
    if(err) {
      return console.log('Error on write:', err.message);
    }
    console.log('Message write:', packet);
  });
}

const read = (packet) => {
  port.on('data', data => {
    if(data.toString('hex') === packet) {
      console.log('Received:', data.toString('hex'));
      process.exit(0);
    }
  });
}

const error = () => {
  port.on('error', err => {
    console.log('Error:', err.message);
  });
}

switchLight(LIGHT_1_TX[0], LIGHT_1_RX[0]);
