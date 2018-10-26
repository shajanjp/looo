const config = require('./sample-config.json');
const loki = require('lokijs');
const db = new loki('looo.json');
const logs = db.addCollection('logs');
const helpers = require('./lib/helpers.js');
const ejs = require("ejs");

let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let looo = {
  db: logs,
  express: (expressApp) => {
    expressApp.set('view engine', 'ejs');
    expressApp.get('/looo', (req, res) => {
      let logsData = logs.find({});
      let logsDataWithDate = logsData.map((log) => {
        let dateFormat = new Date(log.meta.created); 
        dateFormat = `${months[dateFormat.getMonth()]} ${dateFormat.getDate()} - ${dateFormat.getHours()}:${dateFormat.getMinutes()}`;
         log.created = dateFormat;
         return log;
      })
      res.render('list', { logs: logs.find({}) });
    });
  },

  log: (...data) => {
    if(config.options.log.console)
      console.log(...data);
    if(config.options.log.db)
      logs.insert( { level : 'log', data: data } );
  },

  info: (...data) => {
    if(config.options.info.console)
      console.info(helpers.getColor("info"), ...data, "\x1b[0m");
    if(config.options.info.db)
      logs.insert( { level : 'info', data: data } );
  },

  warn: (...data) => {
    if(config.options.warn.console)
      console.warn(helpers.getColor("warn"), ...data, "\x1b[0m");
    if(config.options.warn.db)
      logs.insert( { level : 'warn', data: data } );
  },

  error: (...data) => {
    if(config.options.error.console)
      console.error(helpers.getColor("error"), ...data, "\x1b[0m");
    if(config.options.error.db)
      logs.insert( { level : 'error', data: data } );
  }
}

global.looo = looo;
module.exports = looo
