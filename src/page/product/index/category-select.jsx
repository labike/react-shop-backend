/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 13:04:27
 */

import React, { Component } from 'react';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import './category-select.scss';

class CategorySelect extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstCateList: [],
            firstCateId: 0,
            secondCateList: [],
            secondCateId: 0
        };
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        //只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCateId: nextProps.categoryId,
                secondCateId: 0
            });
        }else{
            //两级品类
            this.setState({
                firstCateId: nextProps.parentCategoryId,
                secondCateId: nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }
    loadFirstCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                firstCateList: res
            })
        }, errMsg => {
            _shopUtil.errorTips(errMsg)
        });
    }
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCateId).then(res => {
            this.setState({
                secondCateList: res
            })
        }, errMsg => {
            _shopUtil.errorTips(errMsg)
        });
    }
    //选择一级分类
    onChangeCatetegory(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCateId: newValue,
            secondCateId: 0,
            secondCateList: []
        }, () => {
            this.loadSecondCategory();
            this.onPropsCateChange();
        });
    }
    //选择二级
    onSecondChangeCatetegory(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCateId: newValue,
        }, () => {
            this.onPropsCateChange();
        });
    }
    //传给父组件选中的categoryId
    onPropsCateChange(){
        //判断props是不是有回掉函数
        let cateChangeAble = typeof this.props.onChangeCategory === 'function';
        if(this.state.secondCateId){
            cateChangeAble && this.props.onChangeCategory(this.state.secondCateId, this.state.firstCateId);
        }else{
            cateChangeAble && this.props.onChangeCategory(this.state.firstCateId, 0);
        }
    }
    render(){
        return(
            <div className="col-md-10">
                <select 
                    value={this.state.firstCateId}
                    className="form-control cate-select"
                    onChange = {(e) => this.onChangeCatetegory(e)}
                    readOnly={this.props.readOnly}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCateList.map(
                            (category, index) => <option key={index} value={category.id}>{category.name}</option>
                        )
                    }
                </select>
                {this.state.secondCateList.length > 0 ?
                    <select 
                        value={this.state.secondCateId}
                        className="form-control cate-select"
                        onChange = {(e) => this.onSecondChangeCatetegory(e)}
                        readOnly={this.props.readOnly}
                    >
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCateList.map(
                                (category, index) => <option key={index} value={category.id}>{category.name}</option>
                            )
                        }
                    </select> : null
                }
            </div>
        )
    }
}

export default CategorySelect;