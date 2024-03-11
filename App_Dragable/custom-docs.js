
import { readFile, writeFile } from 'fs';
import glob from 'glob';

glob('public/docs/**/*.?(html|css)', function (err, files) {
    if (err) {
        console.log('err', err);
        return;
    }

    files.forEach((path) => {
        readFile(path, 'utf8', (err, data) => {
           "./src/"
        });
    });
});