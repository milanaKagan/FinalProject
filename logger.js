const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
 
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint()),
  transports: [new transports.Console(),
    new transports.File({
        filename: 'Airlines.log'})
    ]
})

module.exports = logger;