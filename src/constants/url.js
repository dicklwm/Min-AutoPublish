/**
 * Created by Min on 2016-12-11.
 */
const host='http://101.200.129.112:9527';
export const api={
    init: host + '/deploy/init/',
    login: host + '/deploy/login/',
    logout: host + '/deploy/logout/',
    detail: host + '/deploy/detail/',
    deploy: host + '/deploy/deploy/',
    branch: host + '/deploy/branch/',
    checkout: host + '/deploy/checkout/',
    pull: host + '/deploy/pull/',
    reset: host + '/deploy/reset/',
    editDeploy: host + '/deploy/editDeploy/',
    clone: host + '/deploy/clone/'
}