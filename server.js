const http = require('http')

const server = http.createServer(() => {
    console.log('hi')
})

server.listen(3000);