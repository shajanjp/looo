const helpers = require('./helpers.js')

function renderLogsList(req, res, logs){
  let limit = parseInt(req.query.limit) || 20;
  let offset = parseInt(req.query.skip) || 0;
  let logsDataWithDate = [];
  logsDataWithDate = logs.chain().find({}).offset(offset).limit(limit).data().map((log) => {
    log.created = helpers.timeSince(new Date(log.meta.created));
    return log;
  });
  res.render('list', { logs: logsDataWithDate });
}

module.exports = {
  renderLogsList
}
