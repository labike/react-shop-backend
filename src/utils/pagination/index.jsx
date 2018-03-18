/*
 * @Author: labike 
 * @Date: 2018-03-14 22:20:17 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 22:25:38
 */

import React, { Component } from 'react';

import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class Pagination extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <RcPagination 
                        {...this.props} 
                        hideOnSinglePage
                        showQuickJumper
                    />
                </div>
            </div>
            
        )
    }
}

export default Pagination;