const axios = require('axios');
const { commonHeaders } = require('./constants');
const { getRandomPoint } = require('./utils');

async function patchTask(taskId, bearer) {
  const { data } = await axios({
    url: 'https://agent.gata.xyz/api/task',
    method: 'PATCH',
    headers: {
      ...commonHeaders,
      Authorization: `Bearer ${bearer}`,
    },
    data: {
      id: taskId,
      score: getRandomPoint(),
    },
  });

  return data;
}

async function getData(bearer) {
  const { data } = await axios({
    url: 'https://agent.gata.xyz/api/task_rewards?page=0&per_page=10',
    method: 'GET',
    headers: {
      ...commonHeaders,
      Authorization: `Bearer ${bearer}`,
    },
  });

  return data;
}

async function getTasks(bearer) {
  const { data } = await axios({
    url: 'https://agent.gata.xyz/api/task',
    method: 'GET',
    headers: {
      ...commonHeaders,
      Authorization: `Bearer ${bearer}`,
    },
  });

  return data;
}

module.exports = {
  patchTask,
  getData,
  getTasks,
};
