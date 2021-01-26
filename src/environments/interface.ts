export interface Post {
    title: string
    img: string
    text: string
    author: string
    id: number
    // date: Date
}

export interface Environment {
    DbUrl: string
    production: boolean
}
