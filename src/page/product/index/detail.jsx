/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 13:06:06
 */

import React, { Component } from 'react';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-select.jsx';

import './save.scss';

class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '', //商品库存
            detail: '',
            status: 1
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    //商品编辑表单回填
    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return{
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    };
                });
                this.setState(res);
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        } 
    }
    
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.name}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelect 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    value={this.state.price}
                                    readOnly
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={this.state.stock}
                                    readOnly
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                        <div key={index} className="imgContent">
                                            <img className="img" src={image.url} />
                                            <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>
                                    )
                                ) : (<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;

// categoryId=1&name=三星洗衣机
// &subtitle=三星大促销
// &subImages=test.jpg,11.jpg,2.jpg,3.jpg
// &detail=detailtext
// &price=1000
// &stock=100
// &status=1