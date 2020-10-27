import React from 'react';
import {Typography} from "@material-ui/core";

function Logo(props: { title: string }) {
    const {title} = props;

    return (
        <Typography variant="h3" gutterBottom>{title}</Typography>
    );
}

export default Logo;
