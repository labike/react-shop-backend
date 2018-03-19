/*
 * @Author: labike 
 * @Date: 2018-03-15 21:57:18 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 21:33:03
 */

/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 21:39:33
 */

import React, { Component } from 'react';

class ListSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderNumber: ''
        }
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    onSearch(){
        this.props.onSearch(this.state.orderNumber);
    }
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return(
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select>
                                <option value="">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="请输入订单号"
                                name="orderNumber"
                                onKeyUp = {(e) => this.onSearchKeywordKeyUp(e)}
                                onChange = {(e) => this.onValueChange(e)}
                            />
                        </div>
                        <button 
                            className="btn btn-primary"
                            onClick = {(e) => this.onSearch(e)}
                        >搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;

