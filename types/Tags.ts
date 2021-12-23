import { Posts } from "./Post";
import { Media } from "./utils/Media";
import { Resources, ResourcesData } from "./utils/Resources";

export type TagData = {
    label: string,
    createPage: boolean,
    slug: string,
    media: Resources<ResourcesData<Media>>
    posts: {
        data: Posts
    }
}

export type Tag = ResourcesData<TagData>
export type Tags = ResourcesData<TagData>[]