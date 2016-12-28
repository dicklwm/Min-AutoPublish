/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';
import * as actions from '../../actions';
import {Tabs, Button} from 'antd';
import './index.css';

import FoldersCard from '../../components/RepoDetail/FoldersCard';
import CommitTable from '../../components/RepoDetail/CommitTable';

const TabPane=Tabs.TabPane;

const Repo=React.createClass({
    componentWillMount() {
        console.log('Repo WillMount');
        const {params}=this.props,
            {getDetail}=this.props.actions;
        getDetail({repo_id: params.id});
    },

    render() {
        const {detail} = this.props;
        return (
            <div>
                <h2>{this.props.detail.name}</h2>

                <Tabs tabPosition="top">
                    <TabPane tab="基本信息" key="info" className="infoPane">

                        <div>
                            <Button type="primary" onClick={e => this.deploy()}>上线</Button>
                            <Button type="primary" onClick={e => this.pull()}>Pull</Button>
                        </div>
                        <h4>项目拥有人：{detail.admin.name}</h4>
                        <h4>项目描述：</h4><span>{detail.description}</span>
                        <h4>项目目录结构：（点击目录可切换发布的目录）</h4>

                        {this.makeFoldersCard(detail.folders, detail.deploy)}

                        <h4 className="clearFix">发布的目录：{detail.deploy}</h4>

                        <h4>url:</h4><span>{detail.url}</span>

                    </TabPane>

                    <TabPane tab="分支信息" key="branches" className="branchesPane">

                        <h4>当前激活分支：（点击下列分支可以切换激活分支）</h4>
                        <span className="active-branch">{detail.active_branch}</span>

                        <h4>所有本地分支(local_branches)：</h4>
                        <div>
                            {this.makeBranch(detail.local_branches, detail.active_branch, 'local')}
                        </div>
                        <h4 className="clearFix">所有远程分支(remote_branches)：</h4>
                        <div>
                            {this.makeBranch(detail.remote_branches, detail.active_branch, 'remote')}
                        </div>

                    </TabPane>

                    <TabPane tab="commit信息" key="commit">
                        <CommitTable
                            commit_info={detail.commit_info}
                            reset={this.reset}
                        />
                    </TabPane>

                </Tabs>
            </div>
        )
    },

    //生成Branch
    makeBranch(branches, active_branch, type) {
        var node=[];
        for (let i in branches) {
            if (type==='local')
                node.push(<span className={"branches" + (i===active_branch ? ' active' : '')}
                                key={i}
                                onClick={e => this.checkout(branches[i])}>
                    {i}</span>)
            else
                node.push(<span className={"branches" + (i===active_branch ? ' active' : '')}
                                key={i}
                                onClick={e => this.branch(branches[i])}>
                    {i}</span>)
        }
        return node;
    },

    //生成文件夹的Card
    makeFoldersCard(folders, deploy) {
        if (!!folders) {
            const that=this;
            return folders.map(function (value, index) {
                return <FoldersCard
                    folderName={value}
                    key={index}
                    isActive={value===deploy}
                    editDeploy={that.editDeploy}
                />
            })
        }
    },

    checkout(branchId) {
        const {params, actions} = this.props,
            {id} = params,
            {checkout}=actions;
        checkout({repo_id: id, branch: branchId});
    },

    branch(branchId) {
        const {params, actions} = this.props,
            {id} = params,
            {branch}=actions;
        branch({repo_id: id, branch: branchId});
    },

    editDeploy(folder){
        const {params, actions} = this.props,
            {id} = params,
            {editDeploy}=actions;
        editDeploy({repo_id: id, deploy: folder});
    },

    reset(sha){
        const {params, actions} = this.props,
            {id} = params,
            {reset}=actions;
        reset({repo_id: id, sha: sha});
    },

    pull(){
        const {params, actions} = this.props,
            {id} = params,
            {pull} =actions;
        pull({repo_id: id});
    },

    deploy(){
        const {params, actions} = this.props,
            {id} = params,
            {deploy}=actions;
        deploy({repo_id: id});
    }
})


const mapStateToProps=state => ({
    detail: state.detail
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Repo);