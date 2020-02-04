import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

import render from './core/render';
import models from './core/api/models';
import pages from './core/api/pages';
import components from './core/api/components';

global.appRoot = path.resolve(__dirname);

const port = 3000;
const server = express();

server.use(compression());
server.use(bodyParser.json());
server.use(express.static('dist'));

server.get('/admin', (req, res) => {
  // Render Admin UI
});

// Admin endpoints (= managing data structures)
// Models definition (= APIs)
server.get('/admin/api/models', models.get);
server.post('/admin/api/models', models.create);
server.get('/admin/api/models/:id', models.getSingle);
server.put('/admin/api/models/:id', models.update);
server.delete('/admin/api/models/:id', models.delete);
// Pages (= Display)
server.get('/admin/api/pages', pages.get);
server.post('/admin/api/pages', pages.create);
server.get('/admin/api/pages/:pageName', pages.getSingle);
server.put('/admin/api/pages/:pageName', pages.update);
server.delete('/admin/api/pages/:pageName', pages.delete);
// Components for pages
server.get('/admin/api/components', components.get);
server.post('/admin/api/packages', components.packages.add);
server.delete('/admin/api/packages', components.packages.remove);

// Test endpoint
server.get('/render', (req, res) => {
  try {
    const data = require('./data/db/pages-data/careers.json');
    render(data)
    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Data endpoints (= managing data)
// Models data (= API data)
server.get(`/api/:modelName`, models.getModelData);
server.post(`/api/:modelName`, models.createModelData);
server.get(`/api/:modelName/:id`, models.getSingleModelData);
server.put(`/api/:modelName/:id`, models.updateModelData);
server.delete(`/api/:modelName/:id`, models.deleteModelData);

server.get(`/:pageSlug`, pages.handlePageRender);

server.listen(port);

console.log(`Serving it at http://localhost:${port}`);
