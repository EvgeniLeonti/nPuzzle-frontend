# nPuzzle frontend

## Demo
Check it out at https://npuzzle.vercel.app

## Quick Start

### Client
Clone this repository and follow the next steps:
1. run `npm install`
2. run `npm start`

You should be able to access the client at: http://localhost:3000

### Remote API
After running [client](#Client) steps from above, the client will be connected to remote API at https://npuzzle-backend.herokuapp.com/api/v1.

### Local API

In order to use local API follow the next steps:
- Go to the [backend repository](https://github.com/EvgeniLeonti/nPuzzle-backend) and follow the steps mentioned there. 
- Open `src/config/index.ts` and set `API_ENDPOINT` as http://localhost:8081/api/v1
- Follow [client](#Client) steps from above.