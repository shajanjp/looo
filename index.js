const config = require('./sample-config.json');
const loki = require('lokijs');
const db = new loki('looo.json');
const logs = db.addCollection('logs');
const helpers = require('./lib/helpers.js');
const renderHelpers = require('./lib/render.js');
const ejs = require("ejs");

let customFunction;

let looo = {
  db: logs,

  config: (configData) => {
    customFunction = configData.hook;
    
    if(configData.express && configData.express.app){ 
      let looPath = configData["express"].path || '/looo';
      configData["express"]["app"].set('view engine', 'ejs');
      configData["express"]["app"].get(looPath, renderHelpers.renderLogsList);
    }
    
  },

  log: (...data) => {
    if(config.options.log.console)
      console.log(...data);
    if(config.options.log.db)
      logs.insert( { level : 'log', data: data } );
    if(config.options.log.hook && typeof customFunction == 'function')
      customFunction({ level: 'log', data: data })
  },

  info: (...data) => {
    if(config.options.info.console)
      console.info(helpers.getColor("info"), ...data, "\x1b[0m");
    if(config.options.info.db)
      logs.insert( { level : 'info', data: data } );
    if(config.options.info.hook && typeof customFunction == 'function')
      customFunction({ level: 'info', data: data })
  },

  warn: (...data) => {
    if(config.options.warn.console)
      console.warn(helpers.getColor("warn"), ...data, "\x1b[0m");
    if(config.options.warn.db)
      logs.insert( { level : 'warn', data: data } );
    if(config.options.warn.hook && typeof customFunction == 'function')
      customFunction({ level: 'warn', data: data })
  },

  error: (...data) => {
    if(config.options.error.console)
      console.error(helpers.getColor("error"), ...data, "\x1b[0m");
    if(config.options.error.db)
      logs.insert( { level : 'error', data: data } );
    if(config.options.error.hook && typeof customFunction == 'function')
      customFunction({ level: 'error', data: data })
  }
}

global.looo = looo;
module.exports = looo
