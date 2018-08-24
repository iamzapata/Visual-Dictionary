import "isomorphic-fetch"

const checkStatus = response => {
  if (response.ok) {
    return response
  }
  throw new Error(response.status)
}

function request(url) {
  const requestUrl = `api/${url}`

  return fetch(requestUrl)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => {
      throw Error(err.message)
    })
}

export default request
