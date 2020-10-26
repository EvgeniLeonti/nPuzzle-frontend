import axios from 'axios';
import config from '../config';
import {IGame} from '../interfaces/IGame';
import {ICoordinates} from '../interfaces/ICoordinates';

const GameAPI = {
  init: async (n: number): Promise<IGame> => {
    const gameResult = await axios.post(`${config.API_ENDPOINT}/game/init`, {n});
    return gameResult.data;
  },
  play: async(id: string, source: ICoordinates, destination: ICoordinates): Promise<IGame> => {
    const gameResult = await axios.post(`${config.API_ENDPOINT}/game/play`, {id, source, destination});
    return gameResult.data;
  }
};

export default GameAPI;