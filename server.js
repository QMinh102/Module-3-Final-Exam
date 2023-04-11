const http = require('http')
const router = require('./Controller/router.js')
const handleError = require('./Controller/handle/errorManage.js')

const server = http.createServer((req, res) => {
    let url = req.url;
    let arrPath = url.split('/')
    let path = ''
    let chosenHandle;
    let id = -1
    if(arrPath.length > 2){
        path = arrPath[1]
        id = arrPath[2]
    }
    if(arrPath.length <= 2){
        path = arrPath[1]
    }
    if (router[path] !== undefined) {
        chosenHandle = router[path];
    } else {
        chosenHandle = handleError.pageNotFound;
    }
    chosenHandle(req, res, id)

})
server.listen(8080, 'localhost', () => {
    console.log('server is running')
})