const config = require('./sample-config.json');
const loki = require('lokijs');
const db = new loki('looo.json');
const logs = db.addCollection('logs');

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
  db: logs,

  log: (...data) => {
    if(config.options.log.console)
      console.log(...data);
    if(config.options.log.db)
      logs.insert( { level : 'log', data: data } );
  },

  info: (...data) => {
    if(config.options.info.console)
      console.info(getColor("info"), ...data, "\x1b[0m");
    if(config.options.info.db)
      logs.insert( { level : 'info', data: data } );
  },

  warn: (...data) => {
    if(config.options.warn.console)
      console.warn(getColor("warn"), ...data, "\x1b[0m");
    if(config.options.warn.db)
      logs.insert( { level : 'warn', data: data } );
  },

  error: (...data) => {
    if(config.options.error.console)
      console.error(getColor("error"), ...data, "\x1b[0m");
    if(config.options.error.db)
      logs.insert( { level : 'error', data: data } );
  }
}

global.looo = looo;
module.exports = looo
