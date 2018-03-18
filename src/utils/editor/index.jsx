/*
 * @Author: labike 
 * @Date: 2018-03-14 22:20:17 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-18 12:18:44
 */

import React, { Component } from 'react';

import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

class RichEditor extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }
    loadEditor(){
        let el = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(el),
            defaultValue: this.props.placeholder || '请输入',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    //初始化编辑器事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        });
    }
    render(){
        return(
            <div className="editor">
                <textarea ref="textarea"></textarea>
            </div>
            
        )
    }
}

export default RichEditor;