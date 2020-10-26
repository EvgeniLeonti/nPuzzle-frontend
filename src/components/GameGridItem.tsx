import React from 'react';
import Draggable from 'react-draggable';
import {Grid, GridSize} from "@material-ui/core";
import {ICoordinates} from "../interfaces/ICoordinates";

const getXYCoordinates = (event: any, parentRect: any, n: number): ICoordinates => {
    const {clientX, clientY} = event;
    const tileWidth = parentRect.width / Math.sqrt(n + 1);
    const tileHeight = parentRect.height / Math.sqrt(n + 1);
    const offsets = { x: clientX - parentRect.x, y: clientY - parentRect.y};
    return { x: Math.floor(offsets.x / tileWidth),  y: Math.floor(offsets.y / tileHeight) };
}

function GameGridItem(props: any) {
    const nodeRef = React.useRef(null);
    const {parentRef, n, setDraggedTile, draggedTile, loading} = props;
    const width = 12 / Math.sqrt(n + 1) as GridSize;

    return <Draggable
        disabled={loading}
        nodeRef={nodeRef}
        bounds="parent"
        axis="both"
        handle=".handle"
        scale={1}
        onStart={event => {
            const parentRect = parentRef.current.getBoundingClientRect();
            const source = getXYCoordinates(event, parentRect, n);
            setDraggedTile({source});

        }}
        onStop={event => {
            const parentRect = parentRef.current.getBoundingClientRect();
            const destination = getXYCoordinates(event, parentRect, n);
            setDraggedTile(Object.assign({}, draggedTile, {destination}));
        }}
    >
        <Grid ref={nodeRef} item xs={width} className="handle" style={{minWidth: 40}}>
            {props.children}
        </Grid>
    </Draggable>
}

export default GameGridItem;
