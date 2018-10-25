/*
 * @Author: labike 
 * @Date: 2018-03-14 22:20:17 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-15 21:30:45
 */

import React, { Component } from 'react';

class TabelList extends Component{
    constructor(props){
        super(props)
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading: false
        });
    }
    render(){
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
            if(typeof tableHead === 'object'){
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            }else if(typeof tableHead === 'String'){
                return <th key={index}>{tableHead}</th>
            }
        })
        let listBody = this.props.children;
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? "正在加载数据...":"没有数据"}
                </td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo
        return(
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-border">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TabelList;