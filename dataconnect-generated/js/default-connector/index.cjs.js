const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: '254Fit',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

