const {program} = require('commander');
const fs = require('fs');
program
    .option('-i, --input <path>')
    .option('-o, --output <path>')
    .option('-d, --display');

program.parse();

const options = program.opts();
if (!options.input) {
    console.error("Please, specify input file");
}
fs.readFile(options.input, 'utf8', (err, data) => {
    if (err) {
      console.error("Cannot find input file");
      process.exit(1);
    }
    const formattedResult = JSON.stringify(JSON.parse(data), null, 2);
    if (options.display) {
      console.log(formattedResult);
    }
    if (options.output) {
        fs.writeFile(options.output, formattedResult, 'utf8', (writeErr) => {
            if (writeErr) {
              process.exit(1); // Завершення програми при помилці без виводу повідомлення
            }
          });
        }
  });