import config from '../config'
import GameAPI from "./GameAPI";
import {ICoordinates} from "../interfaces/ICoordinates";
import {IGame} from "../interfaces/IGame";

const handleError = (error: any, location: any, setAlert: any) => {
    console.warn('error', error);

    const errorMessage = error && error.response && error.response.data && error.response.data.errorMessage;
    if (errorMessage) {
        setAlert({severity: 'warning', content: errorMessage});
        return;
    }
    setAlert({severity: 'error', content: `server error`});
};

const clearSourceTile = (setGame: any, currentGame: IGame, source: ICoordinates, destination: ICoordinates) => {
    setGame((currentGame: IGame) => {
        const board = currentGame.board;

        const coordinates: number[] = Object.values(source || {}).concat(Object.values(destination || {}));
        if (coordinates.filter(num => num < 0).length > 0) {
            console.warn('wrong source or destination', {source, destination});
            return;
        }

        try {
            board[source.y][source.x] = null;
        } catch (e) {
            console.warn('failed to clear tile values', {source, destination});
        }

        return currentGame;
    });
};

const GameController = {
    createNewGame: (n: number, setGame: any, setAlert: any): void => {
        (async () => {
            setAlert({severity: 'info', content: config.LOADING_MESSAGE});
            setGame(await GameAPI.init(n));
            setAlert({severity: 'success', content: config.WELCOME_MESSAGE});
        })().catch(error => {
            handleError(error, 'GameController::createNewGame', setAlert);
        })
    },
    onTileDrag: (draggedTile: { source: ICoordinates | null, destination: ICoordinates | null }, game: IGame, setGame: any, setLoading: any, setAlert: any, setDialog: any, setUpdatedAt: any): void => {
        const prevGameState = JSON.parse(JSON.stringify(game));
        const {source, destination} = draggedTile;

        if (!source || !destination) {
            return;
        }

        if (source.x === destination.x && source.y === destination.y) {
            setGame(prevGameState);
            setUpdatedAt((new Date()).valueOf());
            return;
        }

        if (Object.values(source).concat(Object.values(destination)).find(i => i < 0)) {
            setGame(prevGameState);
            setUpdatedAt((new Date()).valueOf());
            return;
        }

        (async () => {
            setAlert({severity: 'info', content: config.LOADING_MESSAGE});
            setLoading(true);
            clearSourceTile(setGame, game, source, destination);
            const updatedGame = await GameAPI.play(game.id, source, destination);
            setGame(updatedGame);
            setUpdatedAt((new Date()).valueOf());
            setLoading(false);
            setAlert({severity: 'success', content: config.WELCOME_MESSAGE});

            if (updatedGame.isFinished) {
                setDialog({title: 'Congratulations 🎉', content: 'You Just Won The Game!'});
            }
        })().catch(error => {
            setGame(prevGameState);
            setUpdatedAt((new Date()).valueOf());
            setLoading(false);
            handleError(error, 'GameController::onTileDrag', setAlert);
        })
    }
};

export default GameController;