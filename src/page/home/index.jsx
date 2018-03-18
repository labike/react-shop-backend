/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 21:40:25
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShopUtil from 'utils/shop.jsx';
import HomeCount from 'service/home-count.jsx';
const _shopUtil = new ShopUtil();
const _homeCount = new HomeCount();

import PageTitle from 'component/page-title/index.jsx';
import './index.scss';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _homeCount.getHomeCount().then(res => {
            this.setState(res);
        }, errMsg => {
            _shopUtil.errorTips(errMsg);
        });
    }
    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link className="color-box brown" to="/user">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户数量</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link className="color-box green" to="/product">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品数量</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link className="color-box blue" to="/order">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单数量</span>
                            </p>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;