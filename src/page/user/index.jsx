/*
 * @Author: labike 
 * @Date: 2018-03-14 21:59:41 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 21:28:16
 */

import React, { Component } from 'react';

import User from 'service/user-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _user = new User();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table/index.jsx';
import Pagination from 'utils/pagination/index.jsx';

class UserList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _shopUtil.errorTips(errMsg)
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render(){
        let tableHeads = [
            {name: 'ID', width: '10%'},
            {name: '用户名', width: '20%'},
            {name: '邮箱', width: '30%'},
            {name: '电话', width: '20%'},
            {name: '注册时间', width: '20%'},
        ]
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        })
        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList tableHeads={tableHeads}>
                    {listBody}
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

export default UserList;