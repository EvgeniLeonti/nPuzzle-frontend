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
    padding: '0'
  },
  gridItem: {
    lineHeight: 2, padding: 5,
    color: 'black',
    '&:hover': {
      background: "#a0a0a0",
      color: "white"
    },
  },
  gridItemNull: {
    lineHeight: 2, padding: 5,
    color: 'white',
    '&:hover': {
      background: "#a0a0a0",
      color: "#a0a0a0"
    },
  }
});

function GameGrid(props: any) {
  const {n, loading, setLoading, game, setGame, setAlert, setDialog} = props;
  const [draggedTile, setDraggedTile] = useState<{source: ICoordinates | null, destination: ICoordinates | null}>({source: null, destination: null});
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => GameController.onTileDrag(draggedTile, game, setGame, setLoading, setAlert, setDialog), [draggedTile]);

  if (!game || !game.board) {
    return <></>
  }

  return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={11} md={8} lg={12} xl={4} className={classes.gridContainer}>
          <Grid container ref={ref} key={loading} alignItems="center" justify="center">
            {game.board.map((row: number[][], x: number) => (
                row.map((val, y: number) =>
                    <GameGridItem loading={loading} x={x} y={y} parentRef={ref} key={`${x}_${y}`} n={n} draggedTile={draggedTile} setDraggedTile={setDraggedTile}>
                      <Paper square className={val ? classes.gridItem : classes.gridItemNull}>{val ? val : 0}</Paper>
                    </GameGridItem>
                )
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default GameGrid;
