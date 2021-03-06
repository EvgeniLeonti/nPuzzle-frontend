import React, {useEffect, useRef, useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import GameGridItem from "./GameGridItem";
import {makeStyles} from "@material-ui/core/styles";
import {ICoordinates} from "../interfaces/ICoordinates";
import GameController from "../services/GameController";

const useStyles = makeStyles({
    gridContainer: {
        position: 'relative',
        overflow: 'auto',
        padding: 20,
        background: 'white',
    },
    gridItem: {
        lineHeight: 2.5, paddingTop: 10, paddingBottom: 10,
        color: 'black',
        '&:hover': {
            background: "#d4d4d4",
        },
    },
    gridItemNull: {
        lineHeight: 2.5, paddingTop: 10, paddingBottom: 10,
        color: '#282c34',
        background: "#282c34"
    }
});

function GameGrid(props: any) {
    const {n, setLoading, game, setGame, setAlert, setDialog} = props;
    const [draggedTile, setDraggedTile] = useState<{ source: ICoordinates | null, destination: ICoordinates | null }>({
        source: null,
        destination: null
    });
    const [updatedAt, setUpdatedAt] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    useEffect(() => GameController.onTileDrag(draggedTile, game, setGame, setLoading, setAlert, setDialog, setUpdatedAt), [draggedTile]);

    if (!game || !game.board) {
        return <></>
    }

    return (
        <Grid container alignItems="center" justify="center">
            <Grid item xs={11} md={8} lg={6} xl={4}>
                <Paper className={classes.gridContainer}>
                    <Grid container spacing={3} ref={ref} key={updatedAt} alignItems="center" justify="center">
                        {game.board.map((row: number[][], x: number) => (
                            row.map((val, y: number) =>
                                <GameGridItem x={x} y={y} parentRef={ref} key={`${x}_${y}`} n={n}
                                              draggedTile={draggedTile} setDraggedTile={setDraggedTile}>
                                    <Paper square
                                           className={val ? classes.gridItem : classes.gridItemNull}>{val ? val : 0}</Paper>
                                </GameGridItem>
                            )
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default GameGrid;
