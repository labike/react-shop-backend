/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 21:52:53
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

class ErrorPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="出错了" />
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorPage;