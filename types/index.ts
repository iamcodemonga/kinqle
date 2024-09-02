export type TCreator = {
    id: string,
    dp: string,
    username: string,
    private: boolean,
    ghost: boolean,
    verified: boolean,
    fullname?: string,
    email?: string,
    tel?: string,
    website?: string,
    country?: string,
    language?: string,
    gender?: string,
    birthday?: string,
    location?: string,
    bio?: string,
    interests?: Array<string>
    titles?: Array<string>
}

export type TContent = {
    id: string,
    type: string,
    thumbnail: string,
    url: string,
    blurhash?: string,
    description?: string,
    commenting?: boolean,
    hashtags?: Array<string>,
    created_at?: string,
    creators?: TCreator
}