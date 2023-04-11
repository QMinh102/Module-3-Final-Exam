const fs = require('fs')

class Error {
    pageNotFound = (req, res) => {
        fs.readFile('./view/error.html', 'utf-8', (err, errorHtml) => {
            res.write(errorHtml)
            res.end()
        })
    }
}

module.exports = new Error();