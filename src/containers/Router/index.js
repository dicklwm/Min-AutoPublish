/**
 * Created by Min on 2016-12-11.
 */
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import React from 'react';
import Login from '../../components/Login'
import Home from '../../containers/Home';
import {init} from '../../api';
import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import reducer from '../../reducers';
import Me from '../../components/Me';
import Projects from '../../components/Projects';
import Repo from '../../components/Repo';
import Index from '../../components/Index';
// import Page404 from '../../components/Page404';

var store=createStore(reducer, compose(
    window.devToolsExtension()
))


const R=React.createClass({


    componentDidMount(){
        //进入路由前先init一下，如果需要登录的修改登录的state

        init(function (res) {
            console.log('Init初次获取数据', res);
            //获取后判断是否已登录
            !!res.noLogin ? hashHistory.push('login') : hashHistory.push('home');
        }, function (err) {
            console.log(err);
        });
    },

    render(){
        return (
            <Provider store={store}>

                <Router history={hashHistory}>
                    <Route path="/" component={ Home }/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}>
                        <IndexRoute component={Index}/>
                        <Route path="me" component={Me}/>
                        <Route path='repo/:id' component={Repo}/>
                        <Route path="projects" component={Projects}/>
                    </Route>
                    {/*<Route path="*" component={Page404}/>*/}
                </Router>

            </Provider>
        )
    }

})


export default R;