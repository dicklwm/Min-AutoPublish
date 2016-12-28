/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';
import {login, init, detail, makeAPI, logout} from '../api';
import {message, notification} from 'antd';
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
                    hashHistory.push('index');
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

export function Logout() {
    return dispatch => {
        logout(function (res) {
            console.log(res);
            hashHistory.push('login');
            dispatch({
                type: TypeOfActions.LOGOUT
            })
        })
    }
}

export function getDetail(query) {

    return dispatch => {
        dispatch(changeLoading(true));
        detail(query, function (res) {
            if (res.error) {
                dispatch(setDetail({}));
                notification.error({message: '错误', description: res.msg});
            } else {
                //将拿到的detail改造一下，加入key和localTime
                res.commit_info=res.commit_info.map(function (value, index) {
                    return {...value, key: index, localTime: new Date(value.time * 1000).toLocaleString()};
                });
                dispatch(setDetail(res));
            }
            dispatch(changeLoading(false));
        }, function (err) {
            message.error(err);
        })
    }
}

function setDetail(res) {
    return {
        type: TypeOfActions.GET_DETAIL,
        data: res
    }
}

export function checkout(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.checkout,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CHECKOUT,
                    data: res
                });
                notification.info({message: "提示", description: res.msg1});
                dispatch(setDetail(res));
                dispatch(changeLoading(false));
            },
            function (err) {
                message.error(err);
            }
        )

    }
}

export function branch(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.branch,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.BRANCH,
                    data: res
                });
                notification.info({message: "提示", description: res.msg1});
                dispatch(setDetail(res));
                dispatch(changeLoading(false));
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function editDeploy(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.editDeploy,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.EDIT_DEPLOY,
                    data: res
                });
                dispatch(setDetail(res));
                dispatch(changeLoading(false));
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function reset(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.reset,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.RESET,
                    data: res
                });
                notification.info({message: "提示", description: res.msg1});
                dispatch(setDetail(res));
                dispatch(changeLoading(false));
            },
            function (err) {
                message.error(err);
            }
        )
    }
}

export function pull(query) {
    return dispatch => {
        dispatch(changeLoading(true));
        makeAPI(
            urls.api.pull,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.PULL,
                    data: res
                });
                dispatch(setDetail(res));
                dispatch(changeLoading(false));
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
                    type: TypeOfActions.DEPLOY,
                    data: res
                });
                res.action==='successful' ?
                    notification.success({message: "成功", description: res.action}) :
                    notification.error({message: "错误", description: res.action})
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


export function createProject(query) {
    return dispatch => {
        makeAPI(
            urls.api.clone,
            query,
            function (res) {
                dispatch({
                    type: TypeOfActions.CREATE_PROJECT,
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
