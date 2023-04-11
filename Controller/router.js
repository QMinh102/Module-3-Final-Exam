const studentManage = require('./handle/studentManage')
const router = {
    'home': studentManage.homePage,
    'detail':studentManage.studentInfo,
    'edit': studentManage.editInfo,
    'add': studentManage.create,
}
module.exports = router
