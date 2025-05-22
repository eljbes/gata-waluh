// index.js
const colors = require('colors');
const { BEARERS, PRIVATE_KEYS } = require('./src/constants');
const { displayHeader, delay, formatBearerToken } = require('./src/utils');
const { getData, getTasks, patchTask } = require('./src/api');
const { getBearerFromPrivateKey, updateBearerFile } = require('./src/auth');

async function processBearer(index, bearer) {
  const formattedBearer = formatBearerToken(bearer);

  while (true) {
    try {
      console.log(
        colors.cyan(`[Bearer ${formattedBearer}] Checking your details...`)
      );
      const users = await getData(bearer);

      if (users) {
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Data fetched successfully!\n`
          )
        );
        console.log(colors.yellow(`Completed Tasks: ${users.completed_count}`));
        console.log(colors.yellow(`Total Points: ${users.total}\n`));
      }

      console.log(colors.cyan(`[Bearer ${formattedBearer}] Getting tasks...`));
      const tasks = await getTasks(bearer);

      if (tasks.id) {
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Fetching tasks successfully!\n`
          )
        );
        console.log(colors.yellow(`ID: ${tasks.id}`));
        console.log(colors.yellow(`Text: ${tasks.text}`));
        console.log(colors.yellow(`Points: ${tasks.point}`));
        console.log(colors.yellow(`Link: ${tasks.link}\n`));

        console.log(
          colors.cyan(
            `[Bearer ${formattedBearer}] Processing task in 45 seconds...`
          )
        );
        await delay(45000);

        await patchTask(tasks.id, bearer);
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Task has been processed successfully!\n`
          )
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(
          colors.yellow(
            `[Bearer ${formattedBearer}] Unauthorized, attempting to refresh token...`
          )
        );
        try {
          const newBearer = await getBearerFromPrivateKey(PRIVATE_KEYS[index]);
          BEARERS[index] = newBearer;
          await updateBearerFile(BEARERS);
          console.log(
            colors.green(
              `[Bearer ${formatBearerToken(newBearer)}] Successfully refreshed token!`
            )
          );
          return processBearer(index, newBearer); // Retry with new bearer
        } catch (authError) {
          console.log(
            colors.red(
              `[Bearer ${formattedBearer}] Failed to refresh token: ${authError.message}`
            )
          );
        }
      } else {
        console.log(colors.red(`[Bearer ${formattedBearer}] Error: ${error}`));
      }
    }
    await delay(5000); // Small delay between retries
  }
}

async function main() {
  displayHeader();
  console.log(colors.yellow('Please wait...\n'));
  await delay(3000);

  // Ensure private keys and bearers match in length
  if (PRIVATE_KEYS.length !== BEARERS.length) {
    console.log(colors.red('Error: Number of private keys and bearers must match'));
    return;
  }

  await Promise.all(
    BEARERS.map((bearer, index) => processBearer(index, bearer))
  );
}

main();// index.js
const colors = require('colors');
const { BEARERS, PRIVATE_KEYS } = require('./src/constants');
const { displayHeader, delay, formatBearerToken } = require('./src/utils');
const { getData, getTasks, patchTask } = require('./src/api');
const { getBearerFromPrivateKey, updateBearerFile } = require('./src/auth');

async function processBearer(index, bearer) {
  const formattedBearer = formatBearerToken(bearer);

  while (true) {
    try {
      console.log(
        colors.cyan(`[Bearer ${formattedBearer}] Checking your details...`)
      );
      const users = await getData(bearer);

      if (users) {
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Data fetched successfully!\n`
          )
        );
        console.log(colors.yellow(`Completed Tasks: ${users.completed_count}`));
        console.log(colors.yellow(`Total Points: ${users.total}\n`));
      }

      console.log(colors.cyan(`[Bearer ${formattedBearer}] Getting tasks...`));
      const tasks = await getTasks(bearer);

      if (tasks.id) {
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Fetching tasks successfully!\n`
          )
        );
        console.log(colors.yellow(`ID: ${tasks.id}`));
        console.log(colors.yellow(`Text: ${tasks.text}`));
        console.log(colors.yellow(`Points: ${tasks.point}`));
        console.log(colors.yellow(`Link: ${tasks.link}\n`));

        console.log(
          colors.cyan(
            `[Bearer ${formattedBearer}] Processing task in 45 seconds...`
          )
        );
        await delay(45000);

        await patchTask(tasks.id, bearer);
        console.log(
          colors.green(
            `[Bearer ${formattedBearer}] Task has been processed successfully!\n`
          )
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(
          colors.yellow(
            `[Bearer ${formattedBearer}] Unauthorized, attempting to refresh token...`
          )
        );
        try {
          const newBearer = await getBearerFromPrivateKey(PRIVATE_KEYS[index]);
          BEARERS[index] = newBearer;
          await updateBearerFile(BEARERS);
          console.log(
            colors.green(
              `[Bearer ${formatBearerToken(newBearer)}] Successfully refreshed token!`
            )
          );
          return processBearer(index, newBearer); // Retry with new bearer
        } catch (authError) {
          console.log(
            colors.red(
              `[Bearer ${formattedBearer}] Failed to refresh token: ${authError.message}`
            )
          );
        }
      } else {
        console.log(colors.red(`[Bearer ${formattedBearer}] Error: ${error}`));
      }
    }
    await delay(5000); // Small delay between retries
  }
}

async function main() {
  displayHeader();
  console.log(colors.yellow('Please wait...\n'));
  await delay(3000);

  // Ensure private keys and bearers match in length
  if (PRIVATE_KEYS.length !== BEARERS.length) {
    console.log(colors.red('Error: Number of private keys and bearers must match'));
    return;
  }

  await Promise.all(
    BEARERS.map((bearer, index) => processBearer(index, bearer))
  );
}

main();
