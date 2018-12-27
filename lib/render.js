const helpers = require('./helpers.js')
const ejs = require("ejs");

function renderLogsList(req, res, logs){
  let limit = parseInt(req.query.limit) || 20;
  let offset = parseInt(req.query.skip) || 0;
  let logsDataWithDate = [];
  logsDataWithDate = logs.chain().find({}).offset(offset).limit(limit).data().map((log) => {
    log.created = helpers.timeSince(new Date(log.meta.created));
    return log;
  });
  ejs.renderFile(`${APP_ROOT}/views/list.ejs`, { logs: logsDataWithDate }, (err, data) => {
    if(err){
      console.log('err', err);
      res.send("<h1>Error</h1>");
    }
    else
      res.send(data);
  });
}

module.exports = {
  renderLogsList
}
