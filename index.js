global.APP_ROOT = __dirname.replace('/index.js', '');
const loki = require('lokijs');
const db = new loki('looo.json');
const logs = db.addCollection('logs');
const helpers = require('./lib/helpers.js');
const renderHelpers = require('./lib/render.js');
let customFunction;

const getValue = (o, p) =>{
  return p.reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, o);
}

let looo = {
  db: logs,

  config: (configData) => {
    options = configData.options || {};
    customFunction = configData.hook;

    if(configData.express && configData.express.app){ 
      let looPath = configData["express"].path || '/looo';
      configData["express"]["app"].get(looPath, (req, res) =>{ renderHelpers.renderLogsList(req, res, logs) });
    }

  },

  log: (...data) => {
    if(getValue(options, ["log", "console"]))
      console.log(...data);
    if(getValue(options, ["log", "db"]))
      logs.insert( { level : 'log', data: data } );
    if(getValue(options, ["log", "hook"]) && typeof customFunction == 'function')
      customFunction({ level: 'log', data: data })
  },

  info: (...data) => {
    if(getValue(options, ["info", "console"]))
      console.info(helpers.getColor("info"), ...data, "\x1b[0m");
    if(getValue(options, ["info", "db"]))
      logs.insert( { level : 'info', data: data } );
    if(getValue(options, ["info", "hook"]) && typeof customFunction == 'function')
      customFunction({ level: 'info', data: data })
  },

  warn: (...data) => {
    if(getValue(options, ["warn", "console"]))
      console.warn(helpers.getColor("warn"), ...data, "\x1b[0m");
    if(getValue(options, ["warn", "db"]))
      logs.insert( { level : 'warn', data: data } );
    if(getValue(options, ["warn", "hook"]) && typeof customFunction == 'function')
      customFunction({ level: 'warn', data: data })
  },

  error: (...data) => {
    if(getValue(options, ["error", "console"]))
      console.error(helpers.getColor("error"), ...data, "\x1b[0m");
    if(getValue(options, ["error", "db"]))
      logs.insert( { level : 'error', data: data } );
    if(getValue(options, ["error", "hook"]) && typeof customFunction == 'function')
      customFunction({ level: 'error', data: data })
  }
}

global.looo = looo;
module.exports = looo;
