export interface Post {
    title: string
    text: string
    author: string
    id: number
}

export interface Environment {
    DbUrl: string
    production: boolean
}
