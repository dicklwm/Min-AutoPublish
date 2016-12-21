/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';
import {login, init} from '../api';
import {message} from 'antd';
import {hashHistory} from 'react-router';

export function getInit(obj) {
    return {
        type: TypeOfActions.GET_INIT,
        info: obj.info,
        project: obj.project,
        users: obj.users
    }
}

export function Login(query) {

    return dispatch=> {
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