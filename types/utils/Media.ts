export type Media = {
    alternativeText: string
    caption: string
    createdAt: Date
    ext: string
    hash: string
    height: number
    mime: string
    name: string
    provider: string
    size: number
    updatedAt: Date
    url: string
    width: number
    formats: {
        small: MediaData
        thumbnail: MediaData
    }
}

type MediaData = {
    ext: string
    hash: string
    height: number
    width: number
    mime: string
    name: string
    path: string
    provider_metadata: {
        public_id: string
        resource_type: string
    }
    size: number
    url: string
}
