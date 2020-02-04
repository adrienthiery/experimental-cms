import fs from 'fs';

async function writeToFile(filename, data) {
    const toWrite = data.toJSONString ? data.toJSONString() : JSON.stringify(data, null, 4);
    return await fs.promises.writeFile(filename, toWrite);
}

async function readFile(filename) {
    const pageContent = await fs.promises.readFile(filename);
    return JSON.parse(pageContent);
}

async function readFolder(folder) {
    return await fs.promises.readdir(folder);
}

async function deleteFile(filename) {
    return await fs.promises.deleteFile(filename);
}

const write = writeToFile;
const read = readFile;
const list = readFolder;
const deleteFn = deleteFile;

export default {
    write,
    read,
    list,
    delete: deleteFn,
};