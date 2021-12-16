import { ResourcesData } from "./utils/Resources";
import { Media } from "./utils/Media";

type GlobalData = {
    title: string
    header: { data: ResourcesData<Media> }
}

export type Global = ResourcesData<GlobalData>