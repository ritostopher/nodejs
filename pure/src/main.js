const http = require('http')
const url = require('url')

const HOST = '127.0.0.1'
const PORT = 8000

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true)

  if(pathname === '/api/debug') {
    let body = ''

    req.on('data', function(chunk) {
      body += chunk
    })

    req.on('end', function() {
      res.writeHead(200, {
        'Content-type': 'application/json'
      })

      res.end(JSON.stringify({
        code: 0,
        debug: {
          method: req.method,
          protocol: req.protocol,
          headers: req.headers,
          query,
          body
        }
      }))
    })
  } else {
    res.writeHead(404, {
      'Content-type': 'application/json'
    })

    res.end(JSON.stringify({code: 0}))
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Listening to requests on port ${PORT}`)
})
