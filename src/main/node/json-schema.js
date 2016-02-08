'use strict';

let jsonSchemaGenerator = require('json-schema-generator');
let json = {
  id: 123,
  name: "josh",
  topics: [{
    id: 455,
    topicName: 'foo'
  }]
};

let schema = jsonSchemaGenerator(json);
console.log(JSON.stringify(schema, null, 2));
