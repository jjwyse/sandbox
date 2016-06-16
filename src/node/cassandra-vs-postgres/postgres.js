'use strict';

const config = require('./config');
const assert = require('assert');
const pg = require('pg');
const util = require('./util');

var exports = module.exports = {};

const query = 'INSERT INTO execution(stepExecutionValues) VALUES($1)';

const insert = (amount) => {
  const handle = (err, result, index) => {
    assert.ifError(err);
    if (index === amount) console.timeEnd("postgres");
  };

  pg.connect(config.pgString, (err, client, done) => {
    console.time("postgres");
    for (let i = 1; i <= amount; i++) {
      client.query(query, [util.gen('1')], (err, result) => handle(err, result, i));
    }
  });
};

exports.start = insert;
