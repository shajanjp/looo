const config = require('./sample-config.json');

function getColor(level){
  switch(level) {
    case "error":
    case 1:
    return "\x1b[31m";

    case "warn":
    case 2: 
    return "\x1b[33m";
    
    case "info":
    case 3: 
    return "\x1b[32m";
    
    default: 
    return "";
  }
}

let looo = {
  log: (...data) => {
    if(config.options.log.console)
      console.log(...data);
    if(config.options.log.db)
      console.log('logging log to db');

  },

  info: (...data) => {
    if(config.options.info.console)
      console.info(getColor("info"), ...data);
    if(config.options.info.db)
      console.log('logging info to db');

  },

  warn: (...data) => {
    if(config.options.warn.console)
      console.warn(getColor("warn"), ...data);
    if(config.options.warn.db)
      console.log('logging warn to db');

  },

  error: (...data) => {
    if(config.options.error.console)
      console.error(getColor("error"), ...data);
    if(config.options.error.db)
      console.log('logging error to db');
  }
}

global.looo = looo;
module.exports = looo;
