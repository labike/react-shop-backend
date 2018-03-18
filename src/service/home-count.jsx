/*
 * @Author: labike 
 * @Date: 2018-03-14 21:33:56 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-14 21:37:08
 */

import ShopUtil from 'utils/shop.jsx';
const _shopUtil = new ShopUtil();

class HomeCount{
    getHomeCount(){
        return _shopUtil.request({
            url: '/manage/statistic/base_count.do'
        })
    }    
}

export default HomeCount;