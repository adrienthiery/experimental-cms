import fs from 'fs';
import storage from '../storage';

async function getComponentsList(req, res) {
    // List components/ folder
    const files = await storage.list(`${appRoot}/components/`);
    const components = files
        .filter((item) => item !== 'external')
        .map((filename) => {
            const component = require(`${appRoot}/components/${filename}`);
            let props;

            const matchProps = component.default.toString().match(/props\.([a-zA-z]*)/);

            if (matchProps) {
                props = matchProps[1];
            } else {
                const functionAsString = component.default.toString();
                props = functionAsString.match(/\n\s*([a-zA-Z]*),?/g).map((prop) => prop.trim()).filter((props) => Boolean(props));
            }

            return {
                name: component.default.name,
                props,
            };
        });

    
    // Get node packages that reference React Components
    
    // For all components, read props and send that with it
    res.send(components);
}

async function addNodePackage(req, res) {
    // Go in components/external and yarn add/npm i something!
}

async function removeNodePackage(req, res) {
    // Go in components/external and yarn remove/npm uninstall something!
}

export default {
    get: getComponentsList,
    packages: {
        add: addNodePackage,
        remove: removeNodePackage,
    },
};