import fs from 'fs';

async function getModels(req, res) {
    const files = await fs.promises.readdir('data/models');

    const result = files.reduce((models, filename) => {
        if (filename.includes('.js')) {
            const model = require(`../../data/models/${filename}`);
            const regExp = new RegExp(/_defineProperty\(this, "([a-zA-Z]*)", ([a-zA-Z]*)\);/, 'gm');
            const props = [];
            let regexpResult = regExp.exec(model.default.toString());
            
            while(regexpResult !== null) {
                props.push({ [regexpResult[1]]: regexpResult[2] });
                regexpResult = regExp.exec(model.default.toString());
            }

            models.push({
                name: model.default.name,
                props,
            });
        }

        return models;
    }, []);

    res.send(result);
}

async function createModel(req, res) {

}

async function updateModel(req, res) {

}

async function deleteModel(req, res) {

}

export default {
    get: getModels,
    create: createModel,
    update: updateModel,
    delete: deleteModel
};