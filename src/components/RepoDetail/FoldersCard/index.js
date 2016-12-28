/** Created by Min on 2016-12-27.  */
import React from 'react';
import './index.css';
import {Card, Icon} from 'antd';

const FoldersCard=({folderName, isActive, editDeploy}) => {
    return (
        <Card className="folderCard" onClick={e => editDeploy(folderName)}>
            <Icon
                type={isActive ? "folder-open" : "folder"}
                className={"folderIcon" + (isActive ? ' active' : '')}
            />
            <h4 className={"folderName" + (isActive ? ' active' : '')}>
                {folderName}
            </h4>
        </Card>
    )
}
export default FoldersCard;