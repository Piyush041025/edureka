// Fs Operations With Yargs

const fs = require('fs');
const yargs = require('yargs');

const text = "You are awesome";

const argv = yargs
    .command('write', 'Write to a new file or existing file', {
        filename: {
            description: 'Name of the file to write',
            demandOption: true,
            alias: 'f',
            type: 'string',
        },
    })
    .help()
    .argv;

let filenames = [];
try {
    filenames = fs.readFileSync('filenames.txt', 'utf8').split('\n').filter(Boolean);
} catch (error) {
    // console.log("File doesn't exists.");
}

if (filenames.includes(argv.filename)) {
    console.log('File already exists. Please provide a new filename/title.');
} else {
    filenames.push(argv.filename);
    fs.writeFileSync('filenames.txt', filenames.join('\n'));

    fs.writeFileSync(argv.filename, text);
    console.log(`File '${argv.filename}' created successfully.`);
}
