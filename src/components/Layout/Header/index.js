/**
 * Created by Min on 2016-12-14.
 */
import React, {Component} from 'react'
import {Breadcrumb, Icon, Menu} from 'antd'
import './index.css';
import {Link} from 'react-router';

export default class Header extends Component {

    render() {
        return (
            <header>
                <div className="ant-layout-main">

                    {/*头*/}
                    <div className="ant-layout-header">
                        <Menu onClick={e => this.onMenuClick(e)}
                              selectedKeys={['app']}
                              mode="horizontal"
                              className="header-menu"
                        >
                            <Menu.Item key="setInfo"><Icon type="edit"/><span>修改信息</span></Menu.Item>
                            <Menu.Item key="logout"><Icon type="poweroff"/><span>登出</span></Menu.Item>
                        </Menu>
                    </div>

                    {/*面包屑*/}
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb>
                            {this.makeBreadcrumbItem()}
                        </Breadcrumb>
                    </div>
                </div>
            </header>
        )
    }

    onMenuClick(e){
        switch (e.key){
            case 'logout':
                console.log('Logout');
                this.props.Logout();
                break;
            default:
                return
        }
    }
    //生成BreadcrumbItem
    makeBreadcrumbItem(){
        var node=[],
            path=this.props.SelectedKeys.split('/'),
            icon='',
            to='',
            text='';

        path.map(function (obj, i) {
            switch (obj){
                case 'home':
                    icon='home';
                    to='home';
                    text='首页';
                    break;
                case 'me':
                    icon='user';
                    to='home/me';
                    text='我的项目';
                    break;
                case 'projects':
                    icon='github';
                    to='home/projects';
                    text='所有项目'
                    break;
                default:
                    return false;
            }
            return node.push(
                <Breadcrumb.Item key={i}><Link to={to}><Icon type={icon}/>{text}</Link></Breadcrumb.Item>
            )
        })

        return node;

    }
}
