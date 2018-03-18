/*
 * @Author: labike 
 * @Date: 2018-03-13 21:02:13 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 20:36:30
 */

import React, { Component } from 'react';

import User from 'service/user-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _user = new User();
const _shopUtil = new ShopUtil();


import './index.scss';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _shopUtil.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登陆 - REACT SHOP';
    }
    onInputChange(e){
        let inputValue = e.target.value,
            inputName = e.target.name;
            //console.log(inputName, inputValue);
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyup(e){
        if(e.keyCode === 13){
            this.onSubmit()
        }
    }
    onSubmit(){
        let loginInfo = {
                username: this.state.username,
                password: this.state.password
            },
            checkResult =_user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login(loginInfo).then((res) => {
                //console.log(this.state.redirect)
                _shopUtil.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        }else{
            _shopUtil.errorTips(checkResult.msg);
        }
    }
    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆REACT SHOP</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text" 
                                    name="username"
                                    className="form-control" 
                                    placeholder="请输入用户名" 
                                    onKeyUp = {e => this.onInputKeyup(e)}
                                    onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码"
                                    onKeyUp = {e => this.onInputKeyup(e)}
                                    onChange={e => this.onInputChange(e)} 
                                />
                            </div>
                            <button
                                className="btn btn-primary btn-lg btn-block"
                                onClick={e => {this.onSubmit(e)}}
                            >
                                登陆
                            </button>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
export default Login;