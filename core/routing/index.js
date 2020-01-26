import render from '../render';

function handlePage(req, res, item) {
    if (item.url === '/') {
        res.sendFile('index.html', { root: 'dist/' });
    } else {
        res.sendFile(`./${item.id}.html`, { root: 'dist/' });
    }
}

function handleModelGet(req, res, item) {
    res.send(`👋 from handleModelGet - ${item.name}`);
}

function handleModelCreate(req, res, item) {
    res.send(`👋 from handleModelCreate - ${item.name}`);
}

function handleModelUpdate(req, res, item) {
    res.send(`👋 from handleModelUpdate - ${item.name}`);
}

function handleModelDelete(req, res, item) {
    res.send(`👋 from handleModelDelete - ${item.name}`);
}

function createPagesEndpoint(err, pages, server) {
    pages.forEach(({ name }) => {
        if (name.includes('.json')) {
            const page = require(`../../data/db/pages-data/${name}`);
            
            render(page);

            server.get(page.url, (req, res) => handlePage(req, res, page));
        }
    });
};

function createModelsEndpoints(err, models, server) {
    models.forEach(({ name }) => {
        if (name.includes('.json')) {
            const model = require(`../../data/db/models-data/${name}`);

            server.get(`/api/${model.name}`, (req, res) => handleModelGet(req, res, model));
            server.post(`/api/${model.name}`, (req, res) => handleModelCreate(req, res, model));
            server.put(`/api/${model.name}`, (req, res) => handleModelUpdate(req, res, model));
            server.delete(`/api/${model.name}`, (req, res) => handleModelDelete(req, res, model));
        }
    });
};

export default {
    createPagesEndpoint,
    createModelsEndpoints,
}