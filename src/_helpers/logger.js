import debug from 'debug';

// https://levelup.gitconnected.com/step-up-your-console-messaging-game-in-your-react-app-42eee17659ec
const BASE = 'writing-react';
const COLOURS = {
  success: 'green',
  trace: 'lightblue',
  info: 'blue',
  warn: 'pink',
  error: 'red',
}; // choose better colours :)

class Log {
  generateMessage(level, message, source) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`;
    const createDebug = debug(namespace);

    // Set the colour of the message based on the level
    createDebug.color = COLOURS[level];

    if (source) { createDebug(source, message); }
    else { createDebug(message); }
  }

  success(message, source) {
    return this.generateMessage('success', message, source);
  }

  trace(message, source) {
    return this.generateMessage('trace', message, source);
  }

  info(message, source) {
    return this.generateMessage('info', message, source);
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source);
  }

  error(message, source) {
    return this.generateMessage('error', message, source);
  }
}

const LogInstance = new Log();

export {LogInstance as Log};
