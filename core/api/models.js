import fs from 'fs';
import storage from '../storage';

async function getModels(req, res) {
    try {
        const files = await storage.list(`${appRoot}/data/models`);

        const result = files.reduce((models, filename) => {
            if (filename.includes('.json')) {
                const model = require(`../../data/models/${filename}`);

                models.push(model);
            }

            return models;
        }, []);

        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getModel(req, res) {
    console.log(req);
    const modelName = 'properties';

    try {
        const modelContent = await storage.read(`${appRoot}/data/models/${modelName}.json`);

        res.send(modelContent);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createModel(req, res) {
    console.log(req);
    const modelName = 'test';
    
    try {
        await storage.write(`${appRoot}/data/models/${modelName}.json`, req.body);
        
        res.status(201).send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateModel(req, res) {
    console.log(req);
    const modelName = 'test';
    
    try {
        await storage.write(`${appRoot}/data/models/${modelName}.json`, req.body);
        
        res.send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteModel(req, res) {
    console.log(req);
    const modelName = 'test';
    
    try {
        await storage.delete(`${appRoot}/data/models/${modelName}.json`);
        
        res.send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// Handle Data

async function getModelData(req, res) {
    const modelName = req.params.modelName;
    const model = require(`${appRoot}/data/models/${modelName}.json`);

    try {
        if (model.unique) {
            const modelContent = await storage.read(`${appRoot}/data/db/models-data/${modelName}.json`);
            res.send(modelContent);
        } else {
            const files = await storage.list(`${appRoot}/data/db/models-data/`);

            const allModelsData = files.reduce((result, item) => {
                if (item.includes(modelName)) {
                    const modelData = require(`${appRoot}/data/db/models-data/${item}`);

                    result.push(modelData);
                }

                return result;
            }, []);

            res.send(allModelsData);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getSingleModelData(req, res) {
    const modelName = req.params.modelName;
    const id = req.params.id;

    try {
        const modelContent = await storage.read(`${appRoot}/data/db/models-data/${modelName}-${id}.json`);

        res.send(modelContent);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createModelData(req, res) {
    try {
        const modelName = req.params.modelName;
        const model = require(`${appRoot}/data/models/${modelName}.json`);
        
        if (model) {
            if (model.unique) {
                try {
                    const data = await storage.read(`${appRoot}/data/db/models-data/${modelName}.json`);
                    if (data) {
                        throw new Error('Already exists');
                    } else if (req.body) {
                        await storage.write(`${appRoot}/data/db/models-data/${modelName}.json`, req.body);
                    } else {
                        throw new Error('No body')
                    }
                } catch (e) {
                    if (req.body) {
                        const data = {
                            id: modelName,
                            model: modelName,
                            ...req.body,
                        };
                        await storage.write(`${appRoot}/data/db/models-data/${modelName}.json`, data);
                    } else {
                        throw new Error('No body')
                    }
                }
            } else {
                const uuid = Math.round(Math.random() * 9999999999999999999);
                const data = {
                    id: uuid,
                    model: modelName,
                    ...req.body,
                };
                await storage.write(`${appRoot}/data/db/models-data/${modelName}-${uuid}.json`, data);
        
                res.status(201).send('ok');
            }
        } else {
            throw new Error('Not a model');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function updateModelData(req, res) {
    const modelName = req.params.modelName;
    const id = req.params.id;
    
    try {
        const modelData = require(`${appRoot}/data/db/models-data/${modelName}-${id}.json`);
        if (req.body.id) {
            delete req.body.id;
        }
        const data = {
            ...modelData,
            ...req.body,
        };
        await storage.write(`${appRoot}/data/db/models-data/${modelName}-${id}.json`, data);
        
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteModelData(req, res) {
    const modelName = req.params.modelName;
    const id = req.params.id;
    
    try {
        await storage.delete(`${appRoot}/data/db/models-data/${modelName}-${id}.json`);
        
        res.send('ok');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default {
    get: getModels,
    getSingle: getModel,
    create: createModel,
    update: updateModel,
    delete: deleteModel,
    getModelData,
    getSingleModelData,
    createModelData,
    updateModelData,
    deleteModelData,
};