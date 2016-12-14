/**
 * Created by Min on 2016-12-09.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Row, Col, message} from 'antd';
import './index.css';
import {login} from '../../api';
import {hashHistory} from 'react-router';

const FormItem=Form.Item;

const Login=Form.create()(React.createClass({

    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-page">
                <Row>
                    <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}
                         lg={{span: 8, offset: 8}}>
                        <div className="login-box">
                            <div className="login-logo">
                                <a href="#">
                                    <b>Min</b> AutoPublish
                                </a>
                            </div>
                            <div className="login-box-body">
                                <p className="login-box-msg">登录</p>


                                <Form vertical>
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{required: true, message: '请输入账号'}],
                                        })(
                                            <Input size="large" addonBefore={<Icon type="user"/>} placeholder="账号"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: '请输入密码'}],
                                        })(
                                            <Input size="large" addonBefore={<Icon type="lock"/>} type="password"
                                                   placeholder="密码"/>
                                        )}
                                    </FormItem>

                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>记住密码</Checkbox>
                                        )}

                                        <a className="login-form-forgot">忘记密码</a>
                                    </FormItem>


                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            onClick={this.handleLoginClick}>
                                        登录
                                    </Button>
                                    <Button type="guest" htmlType="button" className=" login-form-button"
                                            onClick={this.handleRegisterClick}>
                                        注册
                                    </Button>

                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    },

    handleLoginClick(){
        const {getFieldValue} = this.props.form;
        var loading=message.loading('正在登陆，请稍等', 0);
        var query={
            name: getFieldValue('userName') || '',
            password: getFieldValue('password') || ''
        };


        login(query,
            function (res) {
                console.log(res);
                //关闭loading
                loading();
                if (!res.noLogin) {
                    message.success('登陆成功，欢迎您：' + query.name, 1.5);
                    hashHistory.push('home');
                } else {
                    message.error('登陆失败，请检查账号密码。', 3);
                }

            },
            function (err) {
                loading();
                message.error(err, 3);
            }
        )


    },

    handleRegisterClick(){

    }

}))

export default Login;