
const axios = require('axios');

const url = 'https://api.associazionenazionaleivg.com/api/sse/new-deploy'; // URL to make the request to
const headers = {
  'Content-Type': 'application/json', // Optional: specify request headers
};

axios.get(url, {
  method: 'GET',
  headers: headers,
})
  .then(response => {
    console.log('Deploy pinged')
  })
  .catch(error => {
    console.error('An error occurred during the HTTP request:', error);
  });

  