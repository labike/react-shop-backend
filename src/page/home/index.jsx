/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-13 20:16:36
 */

import React, { Component } from 'react';

import PageTitle from 'component/page-title/index.jsx';
import './index.css';

class Home extends Component{
    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-12">body</div>
                </div>
                
            </div>
        )
    }
}

export default Home;