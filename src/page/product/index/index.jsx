/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 22:52:35
 */

/*
 * @Author: labike 
 * @Date: 2018-03-14 21:59:41 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 22:57:36
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table/index.jsx';
import ListSearch from './index-search.jsx';
import Pagination from 'utils/pagination/index.jsx';

import 'component/layout/index.scss';
import './index.scss';

class ProductList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount(){
        this.loadProductList()
    }
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _shopUtil.errorTips(errMsg)
        });
    }
    onSearch(searchType, searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList()
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        });
    }
    onSetProductStatus(e, productId, currentStatus){
        let newStatus = currentStatus === 1 ? 2 : 1,
            tips = currentStatus === 1 ? '确定要下架该商品吗?': '确认要上加该商品吗?';
        if(window.confirm(tips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _shopUtil.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _shopUtil.errorTips(errMsg);
            });
        }
    }
    render(){
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'},
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-right-add">
                        <Link className="btn btn-primary" to="/product/save">
                            <i className="fa fa-plus"></i>
                            <span>添加按钮</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {
                    this.onSearch(searchType, searchKeyword)
                }}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.username}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>
                                            {
                                                product.status === 1 ? '在售' : '已下架'
                                            }
                                        </p>
                                        <button 
                                            className="btn btn-xs btn-warning"
                                            onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}
                                        >
                                            {
                                                product.status === 1 ? '下架' : '上架'
                                            }
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opera" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="opera" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination 
                    current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={pageNum => this.onPageNumChange(pageNum)}
                />
            </div>
        )
    }
}

export default ProductList;