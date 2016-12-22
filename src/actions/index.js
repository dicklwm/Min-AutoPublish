/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';
import {login, init, detail, makeAPI} from '../api';
import {message} from 'antd';
import {hashHistory} from 'react-router';
import * as urls from '../constants/url';


export function getInit(obj) {
    return {
        type: TypeOfActions.GET_INIT,
        info: obj.info,
        project: obj.project,
        users: obj.users
    }
}

export function Login(query) {

    return dispatch => {
        var loading=message.loading('正在登陆，请稍等', 0);
        login(query,
            function (LoginRes) {
                console.log(LoginRes);
                //关闭loading
                loading();
                if (!LoginRes.noLogin) {
                    message.success('登陆成功，欢迎您：' + query.name, 1.5);
                    init(function (InitRes) {
                        if (!!InitRes.noLogin) {
                            hashHistory.push('login');
                        }
                        else {
                            dispatch(getInit(InitRes));
                        }
                    }, function (InitErr) {
                        message.error(InitErr, 3);
                        console.log(InitErr);
                    });
                    hashHistory.push('home');
                } else {
                    message.error('登陆失败，请检查账号密码。', 3);
                }

            },
            function (LoginErr) {
                loading();
                message.error(LoginErr, 3);
            })
    }

}

export function getDetail(query) {

    return dispatch => {
        dispatch(changeLoading(true));
        detail(query, function (res) {
            dispatch({
                type: TypeOfActions.GET_DETAIL,
                data: res
            });
            dispatch(changeLoading(false));
        }, function (err) {
            message.error(err);
        })
    }
}

export function checkout(query) {
    return dispatch => {

        makeAPI(
            urls.api.checkout,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
            },
            function (err) {
                message.error(err);
            }
        )

    }
}

export function branch(query) {
    return dispatch => {
        makeAPI(
            urls.api.branch,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function editDeploy(query) {
    return dispatch => {
        makeAPI(
            urls.api.editDeploy,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function reset(query) {
    return dispatch => {
        makeAPI(
            urls.api.reset,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function pull(query) {
    return dispatch => {
        makeAPI(
            urls.api.pull,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function deploy(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.deploy,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
                dispatch(changeLoading(false));
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

function changeLoading(obj) {
    return {
        type: 'CHANGE-LOADING',
        payload: obj
    }
}