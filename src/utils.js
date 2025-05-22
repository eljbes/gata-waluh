const colors = require('colors');

function getRandomPoint() {
  return (Math.random() * (0.999 - 0.001) + 0.001).toFixed(3);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log(colors.cyan('========================================'));
  console.log(colors.cyan('=           Gata Airdrop Bot           ='));
  console.log(colors.cyan('=     Created by HappyCuanAirdrop      ='));
  console.log(colors.cyan('=    https://t.me/HappyCuanAirdrop     ='));
  console.log(colors.cyan('========================================'));
  console.log(colors.cyan());
}

function formatBearerToken(bearer) {
  return `${bearer.slice(0, 6)}...${bearer.slice(-3)}`;
}

module.exports = {
  getRandomPoint,
  delay,
  displayHeader,
  formatBearerToken,
};
