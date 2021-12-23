import { Media } from "./utils/Media"
import { Resources, ResourcesData } from "./utils/Resources"

type SocialsData = {
    id: number
    active: boolean
    media: Resources<ResourcesData<Media>>
    label: string
    url: string
}

export type Socials = SocialsData[]