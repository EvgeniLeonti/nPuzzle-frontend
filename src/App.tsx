import React, {useEffect, useState} from 'react';
import './App.css';
import GameOptions from "./components/GameOptions";
import Logo from "./components/Logo";
import GameGrid from "./components/GameGrid";
import Alert from './components/Alert';
import Dialog from './components/Dialog';
import GameController from "./services/GameController";
import config from "./config";
import {IGame} from "./interfaces/IGame";
import {Grid, Typography} from "@material-ui/core";

function App() {
    const [n, setN] = useState(config.DEFAULT_N);
    const [game, setGame] = useState<IGame | null>(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ severity: string | null, content: string | null }>({
        severity: null,
        content: null
    });
    const [dialog, setDialog] = useState<{ title: string | null, content: string | null }>({
        title: null,
        content: null
    });

    useEffect(() => GameController.createNewGame(n, setGame, setAlert), [n]);

    return (
        <div className="App">
            <div className="AppFullHeight">
                <div className="AppContent">
                    <header>
                        <Logo title={config.APP_NAME}/>
                    </header>
                    <main>
                        <Grid container spacing={0} alignItems="baseline" justify="center">
                            <Grid item><br/><GameOptions n={n} setN={setN} setGame={setGame}
                                                         setAlert={setAlert}/></Grid>
                            {game && game.board &&
                            <Grid item xs={12}><br/><br/><GameGrid n={n} loading={loading} setLoading={setLoading}
                                                                   game={game} setGame={setGame} setAlert={setAlert}
                                                                   setDialog={setDialog}/></Grid>}
                            <Grid item xs={12}>
                                <br/><br/><Typography variant="body1">Created by <a style={{color: 'white'}}
                                                                                    href="mailto:evgeni.leonti@gmail.com">Evgeni
                                Leonti</a></Typography>
                            </Grid>
                        </Grid>

                    </main>
                </div>
                {alert && alert.severity && alert.content && <Alert setAlert={setAlert} alert={alert}/>}
                {dialog && dialog.title && dialog.content && <Dialog setDialog={setDialog} dialog={dialog}/>}
            </div>

        </div>
    );
}

export default App;
