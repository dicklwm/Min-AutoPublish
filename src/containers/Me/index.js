/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../actions';
import {Row, Col, Button,Input,Modal,Form} from 'antd';
import ProjectCard from '../../components/ProjectCard';

const FormItem = Form.Item;

const Me=React.createClass({

    getInitialState(){
        return {
            showModal: false,
            url: '',
            name: ''
        }
    },

    render(){
        return (
            <div>
                <Row>
                    <div>
                        <Button type="primary" icon="plus"
                                onClick={() => this.setState({showModal: true})}>创建项目</Button>
                    </div>
                    {this.makeCards()}
                </Row>

                <Modal
                    title="创建项目"
                    visible={this.state.showModal}
                    onOk={this.ok}
                    onCancel={this.cancel}
                >
                    <Form>
                        <FormItem
                            label='url'
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                        >
                            <Input value={this.state.url} onChange={(e) => this.setState({url: e.target.value})}/>
                        </FormItem>

                        <FormItem
                            label='name'
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                        >
                            <Input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    },
    makeCards(){
        const {MeInfo} = this.props;
        var {project}=MeInfo;
        if (project) {
            return project.map(
                (obj, i) =>
                    <Col xs={24} sm={12} md={8} lg={6} key={i}>
                        <ProjectCard obj={obj} key={i} from="me"/>
                    </Col>
            );
        }
    },

    ok(){
        const {dispatch} = this.props,
            {url, name} = this.state;
        dispatch(createProject({url, name}));
    },
    cancel(){
        this.setState({
            showModal: false,
            url: '',
            name: ''
        })
    }

})

const mapStateToProps=state => ({
    MeInfo: state.info.info
});


export default connect(mapStateToProps)(Me);