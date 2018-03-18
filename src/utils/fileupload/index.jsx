/*
 * @Author: labike 
 * @Date: 2018-03-16 21:29:50 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-16 22:41:15
 */

import React, { Component } from 'react';

import FileUpload from './react-fileupload.jsx';

class FileUploadGo extends Component{
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError: (err) => {
                this.props.onError(err.message || '上传图片出错!');
            }
        }
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploadGo;
