// constants.js
const fs = require('fs');

const commonHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
  'Cache-Control': 'no-cache',
  Origin: 'https://app.gata.xyz',
  Pragma: 'no-cache',
  Priority: 'u=1, i',
  Referer: 'https://app.gata.xyz/',
  'Sec-CH-UA':
    '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  'Sec-CH-UA-Mobile': '?0',
  'Sec-CH-UA-Platform': '"macOS"',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'X-Gata-Endpoint': 'pc-browser',
};

// Load private keys and bearers
const PRIVATE_KEYS = JSON.parse(fs.readFileSync('private_keys.json')); // New file for private keys
const BEARERS = JSON.parse(fs.readFileSync('bearers.json'));

module.exports = {
  commonHeaders,
  PRIVATE_KEYS,
  BEARERS,
};
