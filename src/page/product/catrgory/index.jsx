/*
 * @Author: labike 
 * @Date: 2018-03-14 21:59:41 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 20:27:07
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table/index.jsx';

class CategoryList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount(){
        this.loadCategoryList()
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            });
        }
        //console.log('componentDidUpdate');
        //console.log(this.props.match.params.categoryId)
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            });
        }, errMsg => {
            this.setState({
                list: []
            });
            _shopUtil.errorTips(errMsg)
        });
    }
    onControl(categoryId, categoryName){
        let newName = window.prompt('请输入新的品类名', categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _shopUtil.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _shopUtil.errorTips(errMsg);
            });
        }
    }
    render(){
        let tableHeads = [
            {name: '品类ID', width: '10%'},
            {name: '品类名称', width: '20%'},
            {name: '操作', width: '30%'}
        ]
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="control" 
                            onClick={(e) => this.onControl(category.id, category.name)}
                        >
                            修改品类名称
                        </a>
                        {
                            category.parentId === 0 ? 
                                <Link to={`/product-catrgory/index/${category.id}`}>查看子品类名称</Link> : null
                        }
                    </td>
                </tr>
            )
        })
        return(
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-right-add">
                        <Link className="btn btn-primary" to="/product-catrgory/add">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
            </div>
        )
    }
}

export default CategoryList;