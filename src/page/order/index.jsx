/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 21:53:25
 */

/*
 * @Author: labike 
 * @Date: 2018-03-14 21:59:41 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 22:57:36
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Order from 'service/order-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _order= new Order();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table/index.jsx';
import ListSearch from './order-search.jsx';
import Pagination from 'utils/pagination/index.jsx';


class OrderList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount(){
        this.loadOrderList();
    }
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.orderNo = this.state.orderNumber;
        }
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _shopUtil.errorTips(errMsg)
        });
    }
    onSearch(orderNumber){
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber,
        }, () => {
            this.loadOrderList()
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }
    render(){
        let tableHeads = [
            {name: '订单号', width: '15%'},
            {name: '收件人', width: '15%'},
            {name: '订单状态', width: '15%'},
            {name: '订单总件', width: '15%'},
            {name: '创建时间', width: '20%'},
            {name: '操作', width: '20%'},
        ] 
        //let tableHeads = ['订单号', '收件人', '订单状态', '订单总件', '创建时间', '操作'];
        return(
            <div id="page-wrapper">
                <PageTitle title="订单列表" />
                <ListSearch onSearch={(orderNum) => {
                    this.onSearch(orderNum)
                }}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
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

export default OrderList;