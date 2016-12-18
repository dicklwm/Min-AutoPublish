/**
 * Created by Min on 2016-12-14.
 */
import React, {PropTypes, Component} from 'react'
import './index.css';

export default class Container extends Component {

    static PropTypes={
        children: PropTypes.children
    }

    render() {
        return (
            <article className="ant-layout-container">

                <div className="ant-layout-content">
                    {this.props.children}
                </div>
            </article>
        )
    }
}
