/**
 * @description user controller
 * @author 雷涵
 */

const { getUserInfo,
        createUser, } = require('../services/user')
const { SuccessModel,ErrorModel} = require('../model/ResModel')
const { registerUserNameNotExistInfo,
        registerUserNameExistInfo,
        registerFailInfo, 
        loginFailInfo,
} = require('../model/ErrorInfo')

const doCrypto = require('../utils/cryp')

//用户名是否存在
 
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { errno: 0, data: {....} }
        return new SuccessModel(userInfo)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}


//注册

async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    try{
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}


async function login(ctx, userName, password) {
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}



module.exports = {
    isExist,
    register,
    login
}