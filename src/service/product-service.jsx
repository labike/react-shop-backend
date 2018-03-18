/*
 * @Author: labike 
 * @Date: 2018-03-13 22:09:01 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 11:38:31
 */

import ShopUtil from 'utils/shop.jsx';

const _shopUtil = new ShopUtil();

class Product{
    getProductList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum; 
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }
        return _shopUtil.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    setProductStatus(productInfo){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }
    //分类
    getCategoryList(parentCategoryId){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证成功'
        };
        if(typeof product.name !== 'string' || product.name.length === 0){
            return {
                status: false,
                msg: '商品名不能为空!'
            }
        }
        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
            return {
                status: false,
                msg: '商品描述不能为空!'
            }
        }
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类!'
            }
        }
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        if(typeof product.stock !== 'number' || !(product.stock > 0)){
            return {
                status: false,
                msg: '请输入正确的库存!'
            }
        }
        
        return result;
    }
    saveProduct(product){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        });
    }
    //获取商品详情
    getProduct(productId){
        return _shopUtil.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
        });
    }
}

export default Product;