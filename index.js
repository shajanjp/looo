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
    if(config.log.console)
    console.log(...data);
  if(config.log.db && )

  },

  info: (...data) => {
    if(config.info.console)
    console.info(getColor("info"), ...data);
  if(config.info.db && )

  },

  warn: (...data) => {
    if(config.warn.console)
    console.warn(getColor("warn"), ...data);
  if(config.warn.db && )

  },

  error: (...data) => {
    if(config.error.console)
    console.error(getColor("error"), ...data);
  if(config.error.db && )

  }
}

global.looo = looo;
module.exports = looo;
