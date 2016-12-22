/**
 * Created by Min on 2016-12-12.
 */
import request from 'superagent';
import * as url from '../constants/url';

export function login(query, successCb, errorCb) {

    request
        .get(url.api.login)
        .query(query)
        .withCredentials()
        .end(function (err, res) {
            if (err) return errorCb(err);
            successCb(res.body);
        })

}

export function init(successCb, errorCb) {
    request
        .get(url.api.init)
        .withCredentials()
        .end(function (err, res) {
            if (err) return errorCb(err);
            successCb(res.body);
        })
}

export function logout(successCb, errorCb) {
    request
        .get(url.api.logout)
        .withCredentials()
        .end(function (err, res) {
            if (err) return errorCb(err);
            successCb(res.body);
        })
}

export function detail(query, successCb, errorCb) {
    request
        .get(url.api.detail)
        .query(query)
        .withCredentials()
        .end(function (err, res) {
            if (err) return errorCb(err);
            successCb(res.body);
        })
}

export function makeAPI(url,query,successCb, errorCb) {
        request
            .get(url)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
                if (err) return errorCb(err);
                successCb(res.body);
            })
}