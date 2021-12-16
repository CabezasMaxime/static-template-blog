import { Posts } from "./Post";
import { ResourcesData } from "./utils/Resources";

export type TagData = {
    label: string,
    createPage: boolean,
    slug: string,
    posts: {
        data: Posts
    }
}

export type Tag = ResourcesData<TagData>
export type Tags = ResourcesData<TagData>[]