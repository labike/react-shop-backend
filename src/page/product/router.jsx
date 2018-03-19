/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-19 19:57:06
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from 'page/product/catrgory/index.jsx';
import CategoryAdd from 'page/product/catrgory/add.jsx';

class ProductRouter extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product/index' component={ProductList} />
                <Route path='/product/save/:pid?' component={ProductSave} />
                <Route path='/product/detail/:pid' component={ProductDetail} />
                <Route path='/product-catrgory/index/:categoryId?' component={CategoryList} />
                <Route path='/product-catrgory/add' component={CategoryAdd} />
                <Redirect exact from='/product' to='/product/index' />
                <Redirect exact from='/product-catrgory' to='/product-catrgory/index' />
            </Switch>
        )
    }
}

export default ProductRouter;