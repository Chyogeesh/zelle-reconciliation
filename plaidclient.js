const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(config);

async function getTransactions() {
  const response = await client.transactionsSync({
    access_token: process.env.PLAID_ACCESS_TOKEN,
    cursor: null,
  });
  return response.data.added;
}

module.exports = { getTransactions };
