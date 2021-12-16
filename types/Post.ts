import { Resources, ResourcesData } from "./utils/Resources";
import { Author } from "./Author";
import { Media } from "./utils/Media";
import { Tags } from "./Tags";

export type PostData = {
    title: string
    description: string
    slug: string
    content: string
    author: Resources<ResourcesData<Author>>
    publishedAt: Date
    updatedAt: Date
    media: Resources<ResourcesData<Media>>
    tags: Resources<ResourcesData<Tags>>
}

export type Post = ResourcesData<PostData>
export type Posts = ResourcesData<PostData>[]