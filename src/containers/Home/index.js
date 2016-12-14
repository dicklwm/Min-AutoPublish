/**
 * Created by Min on 2016-12-12.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
import {init, logout} from '../../api';
import {message} from 'antd';
import {hashHistory} from 'react-router';
import AsideCollapse from '../../components/Layout/AsideCollapse';
import './index.css'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Home=React.createClass({

    getInitialState() {
        return {
            collapse: true,
            SelectedKeys: '',
            BreadcrumbItem: []
        };
    },
    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    },

    componentDidMount(){
        console.log('Home DidMount Init初始化数据');
        const {actions} =this.props;
        init(function (res) {
            if (!!res.noLogin) {
                hashHistory.push('login');
            } else {
                actions.getInit(res);
                message.success('初始化数据成功');
            }

        }, function (err) {
            message.error('初始化数据失败！' + err);
            console.log(err);
        });
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
                    SelectedKeys={this.state.SelectedKeys}
                />

                <Header Logout={this.handleLogout} SelectedKeys={this.state.SelectedKeys}/>
                {/*内容*/}
                <article className="ant-layout-container">
                    <div className="ant-layout-content">
                        <div style={{height: 499}}>
                            {/*嵌套路由*/}
                            {this.props.children}
                        </div>
                    </div>
                </article>

                <Footer/>
            </div>
        )
    },

    //路由发生改变时触发，改变选择项
    componentWillReceiveProps(){
        this.setState({
            SelectedKeys: hashHistory.getCurrentLocation().pathname
        })
    },

    //处理登出
    handleLogout(){
        //调用logout接口
        logout(function (res) {
            console.log(res);
            hashHistory.push('login');
        })
    },

    handleMenuClick(e){

        hashHistory.push(e.key);

    },


})

const mapStateToProps=state => ({
    info: state.info
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);