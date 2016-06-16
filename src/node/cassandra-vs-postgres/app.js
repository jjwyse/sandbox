const pg = require('./postgres');
const cass = require('./cassandra');

const max = 30000;
pg.start(max);
cass.start(max);
