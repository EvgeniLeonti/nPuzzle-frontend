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
    setAlert({severity: 'error', content: `Failed to execute move: server error`});
};

const clearSourceDestinationTiles = (setGame: any, currentGame: IGame, source: ICoordinates, destination: ICoordinates) => {
    setGame((currentGame: IGame) => {
        const board = currentGame.board;

        const coordinates: number[] = Object.values(source || {}).concat(Object.values(destination || {}));
        if (coordinates.filter(num => num < 0).length > 0) {
            console.warn('wrong source or destination', { source, destination });
            return;
        }

        try {
            board[source.y][source.x] = null;
            board[destination.y][destination.x] = null;
        }
        catch (e) {
            console.warn('failed to clear tile values', { source, destination });
        }

        return currentGame;
    });
};

const GameController = {
    createNewGame: (n: number, setGame: any, setAlert: any): void => {
        (async () => {
            setGame(await GameAPI.init(n));
            setAlert({severity: 'success', content: config.WELCOME_MESSAGE});
        })().catch(error => {
            handleError(error, 'GameController::createNewGame', setAlert);
        })
    },
    onTileDrag: (draggedTile: {source: ICoordinates | null, destination: ICoordinates | null}, game: IGame, setGame: any, setLoading: any, setAlert: any, setDialog: any): void => {
        const prevGameState = JSON.parse(JSON.stringify(game));
        const {source, destination} = draggedTile;

        if (!source || !destination) {
            return;
        }

        (async () => {
            setAlert({severity: 'info', content: config.LOADING_MESSAGE});
            setLoading(true);

            clearSourceDestinationTiles(setGame, game, source, destination);

            const updatedGame = await GameAPI.play(game.id, source, destination);
            setGame(updatedGame);

            setLoading(false);
            setAlert({severity: 'success', content: config.WELCOME_MESSAGE});

            if (updatedGame.isFinished) {
                setDialog({title: 'Congratulations 🎉', content: 'You Just Won The Game!'});
            }
        })().catch(error => {
            setGame(prevGameState);
            setLoading(false);
            handleError(error, 'GameController::onTileDrag', setAlert);
        })
    }
};

export default GameController;