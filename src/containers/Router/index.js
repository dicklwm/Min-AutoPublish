/** Created by Min on 2016-12-11. */
import {Router, Route, hashHistory} from 'react-router';
import React from 'react';

import {init} from '../../api';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../../reducers';
import {syncHistoryWithStore} from 'react-router-redux';
import {getInit} from '../../actions';
import thunk from 'redux-thunk';
import createLogger  from 'redux-logger';

// 导入组件
import Me from '../Me';
import Projects from '../Projects';
import Repo from '../Repo';
import Index from '../Index';
import Login from '../Login'
import Home from '../Home';
// import Page404 from '../../components/Page404';
const logger = createLogger();
var store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk,logger)

)

const history=syncHistoryWithStore(hashHistory, store);

const R=React.createClass({

    componentWillMount(){
        //进入路由前先init一下，如果需要登录的修改登录的state

        init(function (res) {
            console.log('Init初次获取数据', res);
            //获取后判断是否已登录
            if (!!res.noLogin) {
                hashHistory.push('login');
            } else {
                // if (hashHistory.getCurrentLocation().pathname!=='/home')
                //     hashHistory.push('/home');
                //向store填充数据
                store.dispatch(getInit(res));
            }
        }, function (err) {
            console.log(err);
        });
    },

    render(){
        return (
            <Provider store={store}>

                <Router history={history}>
                    <Route path="/" component={ Home }>
                        <Route path="index" component={Index}/>
                        <Route path="me" component={Me}/>
                        <Route path='/**/repo/:id' component={Repo}/>
                        <Route path="projects" component={Projects}/>
                    </Route>
                    <Route path="/login" component={Login}/>
                    {/*<Route path="*" component={Page404}/>*/}
                </Router>

            </Provider>
        )
    }

})


export default R;