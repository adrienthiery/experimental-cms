import storage from '../storage';
import Page from '../classes/page';

function handlePageRender(req, res, item) {
    if (item.url === '/') {
        res.sendFile('index.html', { root: 'dist/' });
    } else {
        res.sendFile(`./${item.id}.html`, { root: 'dist/' });
    }
}

async function getPages(req, res) {
    try {
        const pagesFiles = await storage.list(`${appRoot}/data/db/pages-data/`);

        const pages = pagesFiles.reduce((result, file) => {
            if (file.includes('.json')) {
                const pageData = require(`${appRoot}/data/db/pages-data/${file}`);
                
                result.push(pageData);
            }

            return result;
        }, []);
        
        res.send(pages);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getPage(req, res) {
    try {
        const pageName = req.params.pageName;
        const pageContent = await storage.read(`${appRoot}/data/db/pages-data/${pageName}.json`);

        res.send(pageContent);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createPage(req, res) {
    if (!req.body || (!req.body.name && !req.body.title && !req.body.description && !req.body.url)) {
        res.status(400).send('No body');
        return;
    }

    if (!req.body.name || !req.body.title || !req.body.description || !req.body.url) {
        res.status(400).send('Body missing attribute');
        return;
    }

    const page = new Page(req.body.name, req.body.title, req.body.description, req.body.url, req.body.content || []);
    
    try {
        await storage.write(`${appRoot}/data/db/pages-data/${req.body.name}.json`, page);
        
        res.status(201).send(page);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updatePage(req, res) {
    try {
        const pageName = req.params.pageName;
        const pageContent = await storage.read(`${appRoot}/data/db/pages-data/${pageName}.json`);
        const updateData = req.body;

        if (updateData.id) {
            delete updateData.id;
        }

        const data = {
            ...pageContent,
            ...updateData
        };
        await storage.write(`${appRoot}/data/db/pages-data/${modelName}.json`, data);
        
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deletePage(req, res) {
    try {
        const pageName = req.params.pageName;
        await storage.delete(`${appRoot}/data/db/pages-data/${pageName}.json`);
        
        res.send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default {
    get: getPages,
    getSingle: getPage,
    create: createPage,
    update: updatePage,
    delete: deletePage,
    handlePageRender,
};