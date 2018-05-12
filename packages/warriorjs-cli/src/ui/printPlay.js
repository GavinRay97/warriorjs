import sleep from 'delay';

import printBoard from './printBoard';
import printLevelHeader from './printLevelHeader';
import printTurnHeader from './printTurnHeader';
import printLogMessage from './printLogMessage';
import printDebugMessage from './printDebugMessage';

/**
 * Prints a play.
 *
 * @param {Object[]} events The events that happened during the play.
 * @param {nunber} delay The delay between each turn in ms.
 */
async function printPlay(levelNumber, events, delay) {
  let turnNumber = 0;
  let boardOffset = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const event of events) {
    if (turnNumber === 0) {
      printLevelHeader(levelNumber);
      printBoard(event.floor, boardOffset);
      await sleep(delay); // eslint-disable-line no-await-in-loop
    }

    const { type } = event;
    switch (type) {
      case 'TURN':
        turnNumber += 1;
        printTurnHeader(turnNumber);
        boardOffset = 0;
        printBoard(event.floor, boardOffset);
        break;
      case 'UNIT': {
        const { message } = event;
        if (message) {
          printLogMessage(event.unit, message);
          boardOffset += 1;
        }
        printBoard(event.floor, boardOffset);
        break;
      }
      case 'MESSAGE': {
        const { message } = event;
        if (message) {
          printDebugMessage(message);
          boardOffset += 1;
        }
        break;
      }
      default:
        break;
    }

    await sleep(delay); // eslint-disable-line no-await-in-loop
  }
}

export default printPlay;
