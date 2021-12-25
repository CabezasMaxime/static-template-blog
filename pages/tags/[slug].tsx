import { GetStaticProps, NextPage } from "next"
import CustomError from "../../components/CustomError"
import { ApiError } from "../../types/utils/ApiError"
import { GetTags, GetTagBySlug } from "../../utils/DataRequest"
import { ApiResponse } from "../../types/utils/ApiResponse"
import ListPostView from "../../components/ListPostView"
import { Tag, TagData, Tags } from "../../types/Tags"
import { ResourcesData } from "../../types/utils/Resources"
import Breadcrumb from "../../components/Breadcrumb"
import { useRouter } from "next/router"

type TagPageProps = {
    tag: ResourcesData<TagData>,
    error?: ApiError
}

const TagPage: NextPage<TagPageProps> = ({tag, error}) =>  {
    const router = useRouter()

    if(error || !tag) {
        return <CustomError error={error ? error : {status: 404}} />
    }

    return (
        <div>
            <Breadcrumb url={router.asPath} tag={tag.attributes} />
            <ListPostView posts={tag.attributes.posts.data} />
        </div>
    )
}

export const getStaticPaths = async () => {
    let tagsResponse: ApiResponse<Tags> = await GetTags()

    if(tagsResponse.error) {
        return {
            paths: [],
            fallback: true,
        }
    }

    let tagFilter = tagsResponse.data.filter((e) => e.attributes.createPage == true)

    let tableOfPaths = tagFilter.map((e)=> {
        return { params: {slug: e.attributes.slug}}
    })

    return {
        paths: tableOfPaths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    let tagResponse: ApiResponse<Tag> = await GetTagBySlug(context.params.slug as string)

    return {
        props: {
            tag: tagResponse.data ? tagResponse.data : null,
            error: tagResponse.error ? tagResponse.error : null
        },
        revalidate: 3600
    }
}

export default TagPage