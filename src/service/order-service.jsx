/*
 * @Author: labike 
 * @Date: 2018-03-13 22:09:01 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 22:36:15
 */

import ShopUtil from 'utils/shop.jsx';

const _shopUtil = new ShopUtil();

class Order{
    getOrderList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum; 
        }else if(listParam.listType === 'search'){
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _shopUtil.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    getOrderDetail(orderNumber){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
    sendGoods(orderNumber){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
}

export default Order;