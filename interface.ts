export interface User {
    id: string,
    name: string,
    username: string,
    password: string,
    role: string,
    image: string,
}

export interface Card {
    id: string,
    name: string,
    description: string,
    date_start: string,
    date_end: string,
    color: string,
    member: User[],
    list: string
}

export interface List {
    id: string,
    name: string,
    description: string,
    cards: Card[],
    board: string
}

export interface Board {
    id: string,
    name: string,
    description: string,
    lists: List[],
    favorite: boolean,
    owner: string, // user id
    member: string[], // user ids
    color: string
}

export interface BoardJSON {
    data: Board[]
}

export interface ListJSON {
    data: List[]
}

export interface CardJSON {
    data: Card[]
}

export interface UserJSON {
    data: User[]
}