import Express from 'express';
// import socketIo from 'socket.io';
import { Server as server } from 'http';

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
// const io = socketIo(http);

app.use(Express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

http.listen(3000, () => console.log('listening on 3000'));
