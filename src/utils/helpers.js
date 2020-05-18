import fs from "graceful-fs";

// Note we've used graceful-fs instead of fs because it handles "too many files Error:EMFILE"

// Promise version of ReadFileAsync
const fsReadFileAsync = (path, encode) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encode, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

const getFileNames = (path) => {
    return fs.readdirSync(path);
};

export {
    fsReadFileAsync,
    getFileNames,
}