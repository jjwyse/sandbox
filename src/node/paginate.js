const request = require('request-promise');

const opts = {
  url: 'https://snapshot.cloud-elements.com/elements/api-v2/notifications',
  headers: { Authorization: 'User uTXN3NWZMEWz/2YVScQ908KP5QbBIoQ/HOnNNx6n34I=, Organization a3bf89857e5f3d0f99f8ed0a7dca220e' },
  qs: { 'topics[]': 'josh-topic', pageSize: 1 },
  resolveWithFullResponse: true
};

const paginate = (nextPage, counter, max) => {
  console.log(`page number ${counter} using ${nextPage}`);
  if (counter >= max) return;
  opts.qs.nextPage = nextPage;
  return request.get(opts).then(r => paginate(r.headers['elements-next-page-token'], counter + 1, max));
};

return paginate(null, 1, 5).then(r => console.log('done'));
