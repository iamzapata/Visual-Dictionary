import 'isomorphic-fetch';

function request(url, options = {}, api = API_URL) {
  const requestUrl = `${api}/${url}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  if (!options.method) {
    options.method = 'GET';
  }

  options.headers = {
    ...headers,
    ...options.headers,
  };

  return fetch(requestUrl, options).then(response => response.json());
}

export default request;
