const axios = require("axios")

async function request(url, options = {}, api = process.env.API_URL) {
  const requestUrl = `${api}/${url}`

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY
  }

  options.headers = {
    ...headers,
    ...options.headers
  }

  try {
    const response = await axios.get(requestUrl, { headers })
    return response.data
  } catch (err) {
    const { response } = err
    if (response) {
      const { status, statusText } = response
      return { status, statusText }
    }
    throw new Error(err)
  }
}

module.exports = request
