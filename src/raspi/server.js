import Express from 'express';
import socketIo from 'socket.io';
import { Server as server } from 'http';
import gpio from 'rpi-gpio';
import path from 'path';


// Webpack Requirements
import webpack from 'webpack';
import config from '../../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// initialize socket.io
const http = server(app);
const io = socketIo(http);
let motorState = false;
let servoState = false;
let directState = 1;
let ledState = false;

app.use(Express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

http.listen(3000, () => console.log('listening on 3000'));

// gpio.setup(MotorPin, gpio.DRI_OUT, write);
io.on('connection', socket => {
  // turn on/off the motors -> on vs off
  // initial state
  io.emit('motor:state', motorState);
  io.emit('servo:state', servoState);
  io.emit('direction:state', directState);

  socket.on('motor:toggle', (val) => {
    if (val) {
      motorState = !motorState;
      gpio.setup(40, gpio.DIR_OUT, () => {
        gpio.write(40, motorState);
        io.emit('motor:state', motorState);
      });
    }
  });

  // start motion (toggle servo) -> block vs unbloc
  socket.on('servo:toggle', (val) => {
    if (val) {
      servoState = !servoState;
      gpio.setup(38, gpio.DIR_OUT, () => {
        gpio.write(38, servoState);
        io.emit('servo:state', servoState);
      });
    }
  });

  // toggle direction -> forward vs reverse
  socket.on('direction:toggle', (val) => {
    if (val) {
      directState = !directState;
      gpio.setup(36, gpio.DIR_OUT, () => {
        gpio.write(36, directState);
        io.emit('direction:state', directState);
      });
    }
  });

  // listen to motor speed (analog)
  socket.on('led:toggle', (val) => {
    if (val) {
      ledState = !ledState;
      gpio.setup(32, gpio.DIR_OUT, () => {
        gpio.write(32, ledState);
        io.emit('led:state', ledState);
      });
    }
  });
});
