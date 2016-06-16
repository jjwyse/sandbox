'use strict';

const assert = require('assert');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'formulas' });
const uuid = require('node-uuid');
const util = require('./util');

var exports = module.exports = {};

const query = 'INSERT INTO executions JSON ?';

const insert = (amount) => {
  const handle = (err, result, index) => {
    assert.ifError(err);
    if (index === amount) {
      console.timeEnd("cassandra");
    }
  };

  for (let i = 1; i <= amount; i++) {
    console.time("cassandra");
    client.execute(query, [JSON.stringify(util.gen(uuid.v4()))], (err, result) => handle(err, result, i));
  }
};

exports.start = insert;

it('should support GET / and GET /{id}', () => {
  return cloud.get(test.api)
    .then(r => {
      console.log(r.body);
      return cloud.get(test.api + '/' + r.body[0].id);
    });
});
