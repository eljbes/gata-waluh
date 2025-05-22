// auth.js
const axios = require('axios');
const fs = require('fs').promises;
const { commonHeaders } = require('./constants');

async function getBearerFromPrivateKey(privateKey) {
  try {
    const response = await axios({
      url: 'https://agent.gata.xyz/api/auth', // Replace with actual auth endpoint
      method: 'POST',
      headers: {
        ...commonHeaders,
        'Content-Type': 'application/json',
      },
      data: {
        privateKey: privateKey,
      },
    });

    return response.data.token; // Adjust based on actual API response structure
  } catch (error) {
    throw new Error(`Failed to get bearer token: ${error.message}`);
  }
}

async function updateBearerFile(bearers) {
  await fs.writeFile('bearers.json', JSON.stringify(bearers, null, 2));
}

module.exports = {
  getBearerFromPrivateKey,
  updateBearerFile,
};
