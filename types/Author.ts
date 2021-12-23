import { PostData} from "./Post";
import { Media } from "./utils/Media";
import { Resources, ResourcesData } from "./utils/Resources";

export type Author = {
    username: string
    description: string
    avatar: Resources<ResourcesData<Media>>
    posts: Resources<ResourcesData<PostData>[]>
}