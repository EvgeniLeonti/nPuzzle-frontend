import React from 'react';
import {Typography, Grid, Button, MenuItem, Paper, Select} from "@material-ui/core";
import GameController from "../services/GameController";

function GameOptions(props: any) {
  const {n, setN, setGame, setAlert} = props;

  return (
      <Paper style={{paddingRight: 15, paddingLeft: 15}}>
        <Grid container spacing={3} alignItems="baseline" justify="center">
          <Grid item>
            <Typography variant="body1">
              Select N:
            </Typography>
          </Grid>
          <Grid item>
            <Select
                value={n}
                onChange={event => setN(event.target.value)}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={35}>35</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={async () => GameController.createNewGame(n, setGame, setAlert)}>
              New Game
            </Button>
          </Grid>
        </Grid>
      </Paper>
  );
}

export default GameOptions;
