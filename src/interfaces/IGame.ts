export interface Board {
    [index: number]: (number | null)[]
}

export interface IGame {
    id: string;
    board: Board;
    isFinished: boolean;
}