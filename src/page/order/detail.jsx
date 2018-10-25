/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 22:34:47
 */

import React, { Component } from 'react';

import Order from 'service/order-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _order = new Order();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table/index.jsx';

import './detail.scss';

class OrderDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
    }
    componentDidMount(){
        this.loadOrderDetail();
    }
    //商品编辑表单回填
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then((res) => {
            this.setState({
                orderInfo: res
            });
        }, (errMsg) => {
            _shopUtil.errorTips(errMsg);
        });
    }
    onSendGoods(e){
        if(window.confirm('该订单是否已发货?')){
            _order.sendGoods(this.state.orderNumber).then((res) => {
                _shopUtil.successTips('发货成功');
                this.loadOrderDetail();
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        }
    }
    render(){
        let tableHeads = [
            {name: '商品图片', width: '10%'},
            {name: '商品信息', width: '45%'},
            {name: '商品单价', width: '15%'},
            {name: '商品数量', width: '15%'},
            {name: '合计', width: '15%'},
        ];
        let receiverInfo = this.state.orderInfo.shippingVo || {};
        let productList = this.state.orderInfo.orderItemVoList || [];
        return(
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.orderNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.createTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {receiverInfo.receiverName}，
                                {receiverInfo.receiverProvince}
                                {receiverInfo.receiverCity}
                                {receiverInfo.receiverAddress}，
                                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.status === 20 ?
                                    <button 
                                        className="btn btn-sm btn-default btn-send"
                                        onClick={(e) => this.onSendGoods(e)}
                                    >立即发货</button> : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} 
                                                    alt={product.productName} 
                                                />
                                                </td>
                                                <td>{product.productName}</td>
                                                <td>￥{product.currentUnitPrice}</td>
                                                <td>{product.quantity}</td>
                                                <td>￥{product.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail;

// categoryId=1&name=三星洗衣机
// &subtitle=三星大促销
// &subImages=test.jpg,11.jpg,2.jpg,3.jpg
// &detail=detailtext
// &price=1000
// &stock=100
// &status=1