import express from 'express';
import compression from 'compression';
import render from './core/render';
import models from './core/api/models';
import pages from './core/api/pages';
import components from './core/api/components';
import routing from './core/routing';
import fs from 'fs';

const port = 3000;
const server = express();

server.use(compression());

server.use(express.static('dist'));

server.get('/admin', (req, res) => {
  // Render Admin UI
});

server.get('/admin/api/models', models.get);
server.post('/admin/api/models', models.create);
server.put('/admin/api/models', models.update);
server.delete('/admin/api/models', models.delete);

server.get('/admin/api/pages', pages.get);
server.post('/admin/api/pages', pages.create);
server.put('/admin/api/pages', pages.update);
server.delete('/admin/api/pages', pages.delete);

server.get('/admin/api/components', components.get);
server.post('/admin/api/packages', components.packages.add);
server.delete('/admin/api/packages', components.packages.remove);

import data from './data/db/pages-data/careers.json';

server.get('/render', (req, res) => {
  try {
    render(data)
    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

fs.readdir(
  './data/db/pages-data',
  { withFileTypes: true },
  (err, files) => {
    routing.createPagesEndpoint(err, files, server);
  }
);
fs.readdir(
  './data/db/models-data',
  { withFileTypes: true },
  (err, files) => routing.createModelsEndpoints(err, files, server)
);

server.listen(port);

console.log(`Serving it at http://localhost:${port}`);
