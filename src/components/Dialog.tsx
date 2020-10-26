import React from 'react';
import Button from '@material-ui/core/Button';
import {Dialog as MUIDialog} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Dialog(props: any) {
    const {setDialog, dialog} = props;
    const {title, content} = dialog;

    if (!dialog) {
        return <></>
    }

    const handleClose = () => setDialog(null);

    return (
        <div>
            <MUIDialog
                open={!!dialog}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </MUIDialog>
        </div>
    );
}