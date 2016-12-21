/**
 * Created by Min on 2016-12-14.
 */
import React, {PropTypes, Component} from 'react'
import './index.css';
import {Spin} from 'antd';

export default class Container extends Component {

    static PropTypes={
        children: PropTypes.children
    }

    render() {
        return (
            <article className="ant-layout-container">
                <Spin spinning={this.props.loading}>
                    <div className="ant-layout-content">
                        {this.props.children}
                    </div>
                </Spin>
            </article>
        )
    }
}
