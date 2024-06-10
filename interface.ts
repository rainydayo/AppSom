export interface JSONData {
    data: Sample[]
}

export interface Sample {
    name: string,
    field: string,
    food: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    tel: string,
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
    member: User[]
}

export interface List {
    id: string,
    name: string,
    description: string,
    cards: Card[]
}

export interface Board {
    id: string,
    name: string,
    description: string,
    lists: List[],
    favorite: boolean,
    owner: User,
    member: User[],
    color: string
}