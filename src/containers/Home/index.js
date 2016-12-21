/**
 * Created by Min on 2016-12-12.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
import {logout, init} from '../../api';
import {Modal} from 'antd';
import {hashHistory} from 'react-router';
const confirm=Modal.confirm;

//Layout布局
import AsideCollapse from '../../components/Layout/AsideCollapse';
import Header from '../../components/Layout/Header';
// import Footer from '../../components/Layout/Footer';
import Container from '../../components/Layout/Container';

const Home=React.createClass({

    getInitialState() {
        return {
            collapse: true,
        };
    },
    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    },

    componentDidMount(){
        console.log('Home DidMount Init初始化数据');
        const {noLogin} = this.props.info;
        if (noLogin) {
            init(function (res) {
                if (!!res.noLogin) {
                    hashHistory.push('login');
                }
                else {
                    actions.getInit(res);
                }
            }, function (err) {
                console.log(err);
            });
        }
    },

    render(){
        const {collapse} =this.state,
            {info}=this.props,
            {name, logo}=info.info;

        return (
            <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                <AsideCollapse
                    userName={name}
                    logo={logo}
                    collapse={collapse}
                    onCollapseChange={this.onCollapseChange}
                    handleMenuClick={e => this.handleMenuClick(e)}
                    SelectedKeys={this.props.location.pathname}
                />
                <Header Logout={this.handleLogout} SelectedKeys={this.props.location.pathname}/>
                {/*内容 + 嵌套路由*/}
                <Container loading={this.props.loading}>
                    {this.props.children}
                </Container>
                {/*<Footer/>*/}

            </div>
        )
    },

    //处理登出
    handleLogout(){
        confirm({
            title: '登出',
            content: '是否确认需要登出？',
            onOk() {
                //调用logout接口
                logout(function (res) {
                    console.log(res);
                    hashHistory.push('login');
                })
            }
        })


    },

    handleMenuClick(e){
        hashHistory.push(e.key);
    },


})

const mapStateToProps=state => ({
    info: state.info,
    loading: state.loading
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);