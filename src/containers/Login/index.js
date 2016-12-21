/**
 * Created by Min on 2016-12-19.
 */
import React from 'react';
import {login} from '../../api';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {message} from 'antd';
import LoginForm from '../../components/LoginForm';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const Login=React.createClass({

    render(){
        return (
            <LoginForm
                handleLoginClick={query => this.handleLoginClick(query)}
                handleRegisterClick={this.handleRegisterClick}
            />
        )
    },
    handleLoginClick(query){
        const {Login}=this.props;


        Login(query);

        // login(query,
        //     function (res) {
        //         console.log(res);
        //         //关闭loading
        //         loading();
        //         if (!res.noLogin) {
        //             message.success('登陆成功，欢迎您：' + query.name, 1.5);
        //             hashHistory.push('home');
        //         } else {
        //             message.error('登陆失败，请检查账号密码。', 3);
        //         }
        //
        //     },
        //     function (err) {
        //         loading();
        //         message.error(err, 3);
        //     }
        // )


    },

    handleRegisterClick(){

    }


})

const mapStateToProps=state => ({
    info: state.info,
    loading: state.loading
});

const mapDispatchToProps=dispatch => ({
    Login: bindActionCreators(actions.Login, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);