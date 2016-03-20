import Express from 'express';
import socketIo from 'socket.io';
import { Server as server } from 'http';
import  gpio from 'rpi-gpio'
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



app.use(Express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

http.listen(3000, () => console.log('listening on 3000'));

const MotorPin  = 40
const servoPin  = 30
//gpio.setup(MotorPin, gpio.DRI_OUT, write);



io.on('connection', socket => {
  // turn on/off the motors -> on vs off
    socket.on('motor:toggle', (val) => {
/*	gpio.write(MotorPin, val, function(err) {
	    if (err) throw err;
	}); */
	motorState = val;
	io.emit('motor:state', motorState);
    });

  // start motion (toggle servo) -> block vs unbloc
    socket.on('servo:toggle', (val) => {
	console.log(val);
/*	gpio.write(servoPin, val, fucntion(err) {
	    if (err) throw err;
	}); */
	servoState = val;
	io.emit('servo:state', servoState);
	console.log(servoState);
  });

  // toggle direction -> forward vs reverse
    socket.on('direction:toggle', (val) => {
	directState = val;
	io.emit('direction:state', directState);
  });

  // listen to motor speed (analog)
    socket.on('motor:speed', () => {
	
  });
});
