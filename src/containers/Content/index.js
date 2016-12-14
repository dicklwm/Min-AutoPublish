/**
 * Created by Min on 2016-12-14.
 */
/**
 * Created by Min on 2016-12-14.
 */
import React, {PropTypes, Component} from 'react'
import './index.css'

export default class Content extends Component {

    static PropTypes= {
        info:PropTypes.info
    }

    render() {
        return (
            <article className="ant-layout-container">
                <div className="ant-layout-content">
                    <div style={{height: 499}}>
                    </div>
                </div>
            </article>
        )
    }
}
