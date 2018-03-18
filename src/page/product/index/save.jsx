/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 12:47:20
 */

import React, { Component } from 'react';

import Product from 'service/product-service.jsx';
import ShopUtil from 'utils/shop.jsx';
const _product = new Product();
const _shopUtil = new ShopUtil();

import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-select.jsx';
import FileUploadGo from 'utils/fileupload/index.jsx';
import RichEditor from 'utils/editor/index.jsx';

import './save.scss';

class ProductSave extends Component{
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
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        } 
    }
    onChangeCategory(categoryId, parentCategoryId){
        //console.log('categoryId:', categoryId);
        //console.log('parentCategoryId:', parentCategoryId);
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })
    }
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages: subImages
        })
    }
    onUploadError(errMsg){
        _shopUtil.errorTips(errMsg.message || '上传图片失败')
    }
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        });
    }
    onRichEditorChange(value){
        console.log(value);
        this.setState({
            detail: value
        });
    }
    //商品名称
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    getSubImages(){
        return this.state.subImages.map((img) => img.uri).join(',');
    }
    //提交
    onSubmit(){
        let product = {
            name: this.state.name,
            categoryId: parseInt(this.state.categoryId),
            price: parseFloat(this.state.price),
            subtitle: this.state.subtitle,
            detail: this.state.detail,
            subImages: this.getSubImages(),
            stock: parseInt(this.state.stock),
            status: this.state.status
        },
        //console.log(product);
        productCheck = _product.checkProduct(product);
        if(this.state.id){
            product.id = this.state.id;
        }
        if(productCheck.status){
            _product.saveProduct(product).then((res) => {
                _shopUtil.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _shopUtil.errorTips(errMsg);
            });
        }else{
            _shopUtil.errorTips(productCheck.msg);
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
                            <input type="text" 
                                className="form-control" 
                                placeholder="请输入商品名称" 
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" 
                                className="form-control" 
                                placeholder="请输入商品描述" 
                                name="subtitle"
                                value={this.state.subtitle}
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelect 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onChangeCategory={(categoryId, parentCategoryId) => 
                                this.onChangeCategory(categoryId, parentCategoryId)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="请输入商品价格" 
                                    name="price"
                                    value={this.state.price}
                                    onChange={(e) => this.onValueChange(e)}
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
                                    placeholder="库存" 
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={(e) => this.onValueChange(e)}
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
                                ) : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploadGo 
                                onSuccess = {(res) => this.onUploadSuccess(res)}
                                onError = {(errMsg) => this.onUploadError(errMsg)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onRichEditorChange(value)}
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
        )
    }
}

export default ProductSave;

// categoryId=1&name=三星洗衣机
// &subtitle=三星大促销
// &subImages=test.jpg,11.jpg,2.jpg,3.jpg
// &detail=detailtext
// &price=1000
// &stock=100
// &status=1