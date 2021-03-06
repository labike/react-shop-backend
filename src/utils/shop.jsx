/*
 * @Author: labike 
 * @Date: 2018-03-13 20:41:12 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 20:55:29
 */

class ShopUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    if(res.status === 0){
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }else if(res.status === 10){
                        this.doLogin();
                    }else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                    //console.log(res);
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        }); 
    }
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    getUrlParam(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    errorTips(errMsg){
        alert(errMsg || '哪里出错了!');
    }
    successTips(successMsg){
        alert(successMsg || '操作成功!');
    }
    setStorage(name, data){
        let dataType = typeof data;
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }else{
            alert('该类型不能用于本地存储!');
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default ShopUtil;