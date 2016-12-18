/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {Menu, Icon, Input, Badge} from 'antd';
import './index.css';
const Search=Input.Search;

const AsideCollapse=React.createClass({

    propTypes: {
        collapse: React.PropTypes.bool,
        onCollapseChange: React.PropTypes.func,
        userName: React.PropTypes.string,
        logo:React.PropTypes.string
    },

    render() {
        const {collapse, onCollapseChange, userName,handleMenuClick,SelectedKeys}=this.props;
        return (

            <aside className="ant-layout-sider">
                <div className="ant-layout-logo">
                    {/*以后用logo*/}
                    <img src="/images/head.jpg" alt="头像"/>
                    <Search className="ant-layout-search" placeholder="输入关键字检索"
                            onSearch={value => this.handleSearch(value)}/>
                </div>
                <div className="ant-layout-userName">
                    <span>{userName}</span> <Badge className="ant-layout-status" status="success"/>
                </div>
                <Menu mode="inline" theme="dark" selectedKeys={[SelectedKeys]} onClick={handleMenuClick}>
                    <Menu.Item key="/home" title="首页">
                        <Icon type="home"/>
                        {!collapse && <span className="nav-text">首页</span>}
                    </Menu.Item>
                    <Menu.Item key="/home/me" title="我的项目">
                        <Icon type="user"/>
                        {!collapse && <span className="nav-text">我的项目</span>}
                    </Menu.Item>
                    <Menu.Item key="/home/projects" title="所有项目">
                        <Icon type="github"/>
                        {!collapse && <span className="nav-text">所有项目</span>}
                    </Menu.Item>
                </Menu>
                <div className="ant-aside-action" onClick={onCollapseChange}>
                    {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                </div>
            </aside>


        )
    },

    handleSearch(value){
        console.log(value)
    }


});
export default AsideCollapse;