/*
 * @Author: labike 
 * @Date: 2018-03-15 21:57:18 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 22:21:52
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
            searchType: 'productId',
            searchKeyword: ''
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
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
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
                            <select 
                                name="searchType"
                                className="form-control"
                                onChange = {(e) => this.onValueChange(e)}
                            >
                                <option value="productName">按商品名称查询</option>
                                <option value="productId">按商品ID查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="关键词"
                                name="searchKeyword"
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

