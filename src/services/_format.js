
const { DEFAULT_PICTURE } = require('../conf/constant')

function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}


function formatUser(list){
    if(list == null){
        return list
    }

    if(list instanceof Array){
        //数组 用户列表
        return list.map(_formatUserPicturn)
    }

    //单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}