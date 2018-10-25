/*
 * @Author: labike 
 * @Date: 2018-03-13 22:09:01 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 22:57:51
 */

import ShopUtil from 'utils/shop.jsx';

const _shopUtil = new ShopUtil();

class User{
    login(loginInfo){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        if(typeof username !== 'string' || username.length === 0){
            return {
                status: false,
                msg: '用户名不能为空!'
            }
        }
        if(typeof password !== 'string' || password.length === 0){
            return {
                status: false,
                msg: '密码不能为空!'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    logout(){
        return _shopUtil.request({
            type: 'post',
            url: '/user/logout.do'
        });
    }
    getUserList(pageNum){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        });
    }
}

export default User;