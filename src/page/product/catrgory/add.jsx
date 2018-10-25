/*
 * @Author: labike 
 * @Date: 2018-03-14 21:59:41 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 20:23:01
 */

import React, { Component } from 'react';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';

class CategoryAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount(){
        this.loadCategoryList()
    }
    
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            _shopUtil.errorTips(errMsg)
        });
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit(e){
        let categoryName = this.state.categoryName;
        if(categoryName){
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then((res) => {
                _shopUtil.successTips(res);
                this.props.history.push('/product-catrgory/index');
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        }else{
            _shopUtil.errorTips('请输入品类名称');
        }
    }
    render(){
        let tableHeads = [
            {name: '品类ID', width: '10%'},
            {name: '品类名称', width: '20%'},
            {name: '操作', width: '30%'}
        ]
        
        return(
            <div id="page-wrapper">
                <PageTitle title="品类列表" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select 
                                        name="parentId" 
                                        className="form-control"
                                        onChange={(e) => 
                                            this.onValueChange(e)
                                        }
                                    >
                                        <option value="0">根品类</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control" 
                                        placeholder="请输入品类名称" 
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={(e) => {this.onSubmit(e)}
                                }>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CategoryAdd;