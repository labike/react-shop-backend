/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 13:07:56
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';

class ProductRouter extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product/index' component={ProductList} />
                <Route path='/product/save/:pid?' component={ProductSave} />
                <Route path='/product/detail/:pid' component={ProductDetail} />
                <Redirect exact from='/product' to='/product/index' />
            </Switch>
        )
    }
}

export default ProductRouter;