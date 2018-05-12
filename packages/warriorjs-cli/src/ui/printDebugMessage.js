import chalk from 'chalk';
import fs from 'fs';

/**
 * Prints a message to the log.
 *
 * @param {string} message The message to print.
 */
function printDebugMessage(message) {
  const style = chalk.yellow.bold;
  const isObject = typeof message === 'function';
  const outfileHint = "[Object detected, results written to './debug.json']";

  // Ensure that only one row of CLI text is used to avoid ruining the output
  // Slice the string starting at 0, and then from the length of the terminal minus the text "🛈 "
  const debug = (message) => console.log(style(`🛈 ${message}`).slice(0, process.stdout.columns));
  if (isObject) {
    const formattedObj = JSON.stringify(message, null, 2);
    fs.writeFile(process.cwd() + '/debug.json', formattedObj, err => {
      if (err) throw err;
      debug(outfileHint);
    });
  }
  else {
    const formattedObj = JSON.stringify(message);
    debug(formattedObj);
  }
}

export default printDebugMessage;
