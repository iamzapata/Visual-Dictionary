"use strict"

const OxfordAPI = require("./request")
const Hapi = require("hapi")
require("dotenv").config()

const server = Hapi.server({
  host: "localhost",
  port: "3000"
})

server.route({
  method: "GET",
  path: "/api/define/{word}",
  handler: async (request, h) => {
    const entries = await OxfordAPI(`entries/en/${request.params.word}`)
    if (entries.status === 404) {
      return h.response(entries).code(entries.status)
    }
    return h.response(entries)
  }
})

server.route({
  method: "GET",
  path: "/api/suggestions/{word}",
  handler: async (request, h) => {
    const suggestions = await OxfordAPI(
      `search/en?q=${request.params.word}&prefix=false`
    )
    return h.response(suggestions)
  }
})

// Start the server
async function start() {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log("Server running at:", server.info.uri)
}

// handle all unhandled promise rejections
process.on("unhandledRejection", err => {
  console.log(err)
  process.exit(1)
})

start()

// listen on SIGINT signal and gracefully stop the server
process.on("SIGINT", function() {
  console.log("stopping hapi server")

  server.stop({ timeout: 10000 }).then(function(err) {
    console.log("hapi server stopped")
    process.exit(err ? 1 : 0)
  })
})
