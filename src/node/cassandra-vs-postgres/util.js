var exports = module.exports = {};

exports.gen = (uuid) => {
  return {
    "id": uuid,
    "stepExecutionValues": [{
      "id": 119284,
      "key": "get-accounts.request.uri",
      "value": "http://foo.ngrok.io/elements/api-v2/hubs/crm/accounts"
    }, {
      "id": 119285,
      "key": "get-accounts.request.method",
      "value": "GET"
    }, {
      "id": 119286,
      "key": "get-accounts.request.headers",
      "value": "{\"Elements-Formula-Id\":\"2142\",\"Authorization\":\"Element /foo, User foo, Organization foo\",\"Elements-Formula-Execution-Id\":\"4411\",\"Elements-Formula-Step\":\"get-accounts\",\"Elements-Formula-Step-Retry-Count\":\"0\",\"Elements-Formula-Request-Id\":\"31212\"}"
    }, {
      "id": 119287,
      "key": "get-accounts.request.body"
    }, {
      "id": 119288,
      "key": "get-accounts.response.code",
      "value": "200"
    }, {
      "id": 119289,
      "key": "get-accounts.response.headers",
      "value": "{}"
    }, {
      "id": 119290,
      "key": "get-accounts.response.body",
      "value": "[{\"id\": 123}]"
    }],
    "status": "success",
    "createdDate": "2016-02-16 14:54:17.727145",
    "updatedDate": "2016-02-16 14:54:26.100063",
    "stepName": "get-accounts"
  };
};
