/**
 * Created by Min on 2016-12-21.
 */
import React from 'react';
import {Tabs, Card, Icon} from 'antd';
import './index.css';

const TabPane=Tabs.TabPane;

const RepoDetail=({detail}) => {

    function makeFoldersCard() {
        if (!!detail.folders) {
            return detail.folders.map(function (value, index) {
                return <FoldersCard folderName={value} key={index} isActive={value===detail.deploy}/>
            })
        }
    }

    function makeBranch(branches, type) {
        var node=[];
        for (let i in branches) {
            if (type==='local')
                node.push(<span className={"branches" + (i===detail.active_branch ? ' active' : '')}
                                key={i}
                                onClick={branchId => (branches[i])}>
                    {i}</span>)
            else
                node.push(<span className={"branches" + (i===detail.active_branch ? ' active' : '')}
                                key={i}
                                onClick={branchId => (branches[i])}>
                    {i}</span>)
        }
        return node;
    }

    return (
        <Tabs tabPosition="top">

            <TabPane tab="基本信息" key="info" className="infoPane">

                <h4>项目拥有人：{detail.admin.name}</h4>
                <h4>项目描述：</h4><span>{detail.description}</span>
                <h4>项目目录结构：（点击目录可切换发布的目录）</h4>

                {makeFoldersCard()}

                <h4 className="clearFix">发布的目录：{detail.deploy}</h4>

                <h4>url:</h4><span>{detail.url}</span>

            </TabPane>

            <TabPane tab="分支信息" key="branches" className="branchesPane">
                <h4>当前激活分支：</h4><span className="active-branch">{detail.active_branch}</span>

                <h4>所有本地分支(local_branches)：</h4>
                <div>
                    {makeBranch(detail.local_branches, 'local')}
                </div>
                <h4 className="clearFix">所有远程分支(remote_branches)：</h4>
                <div>
                    {makeBranch(detail.remote_branches, 'remote')}
                </div>
            </TabPane>

            <TabPane tab="commit信息" key="commit">
                Content of Tab 3
            </TabPane>

        </Tabs>
    )

}

const FoldersCard=({folderName, isActive}) => {
    return (
        <Card className="folderCard">
            <Icon type={isActive ? "folder-open" : "folder"} className={"folderIcon" + (isActive ? ' active' : '')}/>
            <h4 className={"folderName" + (isActive ? ' active' : '')}>{folderName}</h4>
        </Card>
    )
}

export default RepoDetail;