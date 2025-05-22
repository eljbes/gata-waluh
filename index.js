// index.js
const { BEARERS, PRIVATE_KEYS } = require('./src/constants');
const { displayHeader, delay, formatBearerToken } = require('./src/utils');
const { getData, getTasks, patchTask } = require('./src/api');
const { getBearerFromPrivateKey, updateBearerFile } = require('./src/auth');

async function processBearer(index, bearer) {
  const formattedBearer = formatBearerToken(bearer);
  let retryDelay = 5000; // Jeda awal dalam ms

  while (true) {
    try {
      console.log(`[Bearer ${formattedBearer}] Checking your details...`);
      const users = await getData(bearer);

      if (users) {
        console.log(`[Bearer ${formattedBearer}] Data fetched successfully!\n`);
        console.log(`Completed Tasks: ${users.completed_count}`);
        console.log(`Total Points: ${users.total}\n`);
      }

      console.log(`[Bearer ${formattedBearer}] Getting tasks...`);
      const tasks = await getTasks(bearer);

      if (tasks.id) {
        console.log(`[Bearer ${formattedBearer}] Fetching tasks successfully!\n`);
        console.log(`ID: ${tasks.id}`);
        console.log(`Text: ${tasks.text}`);
        console.log(`Points: ${tasks.point}`);
        console.log(`Link: ${tasks.link}\n`);

        console.log(`[Bearer ${formattedBearer}] Processing task in 45 seconds...`);
        await delay(45000);

        await patchTask(tasks.id, bearer);
        console.log(`[Bearer ${formattedBearer}] Task has been processed successfully!\n`);
      }

      retryDelay = 5000; // Reset jeda setelah permintaan berhasil
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(`[Bearer ${formattedBearer}] Unauthorized, attempting to refresh token...`);
        try {
          const newBearer = await getBearerFromPrivateKey(PRIVATE_KEYS[index]);
          BEARERS[index] = newBearer;
          await updateBearerFile(BEARERS);
          console.log(`[Bearer ${formatBearerToken(newBearer)}] Successfully refreshed token!`);
          return processBearer(index, newBearer); // Retry dengan bearer baru
        } catch (authError) {
          console.log(`[Bearer ${formattedBearer}] Failed to refresh token: ${authError.message}`);
        }
      } else if (error.response?.status === 429) {
        console.log(`[Bearer ${formattedBearer}] Rate limit exceeded, retrying after ${retryDelay / 1000} seconds...`);
        await delay(retryDelay);
        retryDelay = Math.min(retryDelay * 2, 60000); // Exponential backoff, maksimum 60 detik
        continue; // Coba lagi
      } else {
        console.log(`[Bearer ${formattedBearer}] Error: ${error}`);
      }
    }
    await delay(retryDelay); // Jeda antar iterasi
  }
}

async function main() {
  displayHeader();
  console.log('Please wait...\n');
  await delay(3000);

  // Validasi jumlah private keys dan bearers
  if (PRIVATE_KEYS.length !== BEARERS.length) {
    console.log('Error: Number of private keys and bearers must match');
    return;
  }

  // Proses bearer satu per satu untuk mengurangi risiko rate limit
  for (let i = 0; i < BEARERS.length; i++) {
    console.log(`Processing bearer ${i + 1} of ${BEARERS.length}`);
    await processBearer(i, BEARERS[i]);
    await delay(10000); // Jeda 10 detik antar bearer
  }
}

main().catch((err) => console.error('Main error:', err));
