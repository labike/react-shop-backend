/*
 * @Author: labike 
 * @Date: 2018-03-12 22:19:49 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-12 23:01:03
 */

import React, { Component } from 'react';

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

import './theme.css';

class Layout extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="wrapper">
                <TopNav />
                <SideNav />
                {this.props.children}
            </div>
        )
    }
}

export default Layout;