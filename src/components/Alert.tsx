import React from 'react';
import {Alert as MUIAlert} from '@material-ui/lab';
import {Snackbar} from "@material-ui/core";

function Alert(props: any) {
    const {alert} = props;

    if (!alert) {
        return <></>
    }

    return (
        <Snackbar open={true}>
            <MUIAlert variant="filled" severity={alert.severity}>{alert.content}</MUIAlert>
        </Snackbar>
    );
}

export default Alert;
