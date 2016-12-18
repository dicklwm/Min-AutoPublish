/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, Spin} from 'antd';
import ProjectCard from '../../components/ProjectCard';

const Me=React.createClass({

    getInitialState(){
        return {
            loading: true
        }
    },

    render(){
        return (
            <Spin spinning={this.state.loading}>
                <Row>
                    {this.makeCards()}
                </Row>
            </Spin>
        )
    },
    componentDidMount(){
        this.setState({loading: false})
    },
    makeCards(){
        const {MeInfo} = this.props;
        var {project}=MeInfo;
        if (project) {
            return project.map(
                (obj, i) =>
                    <Col xs={24} sm={12} md={8} lg={6} key={i}>
                        <ProjectCard obj={obj} key={i}/>
                    </Col>
            );
        }
    }

})

const mapStateToProps=state => ({
    MeInfo: state.info.info
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);