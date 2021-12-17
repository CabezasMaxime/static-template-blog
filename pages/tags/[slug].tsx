import { GetStaticProps, NextPage } from "next"
import CustomError from "../../components/CustomError"
import { Post, Posts } from "../../types/Post"
import { ApiError } from "../../types/utils/ApiError"
import { GetGlobal, GetPostBySlug, GetTags, GetTagBySlug } from "../../utils/DataRequest"
import { ApiResponse } from "../../types/utils/ApiResponse"
import ListPostView from "../../components/ListPostView"
import { Tag, TagData, Tags } from "../../types/Tags"
import { ResourcesData } from "../../types/utils/Resources"
import { Global } from "../../types/Global"

type TagPageProps = {
    tag: ResourcesData<TagData>,
    tags: Tags,
    global: Global,
    posts: Posts,
    error?: ApiError
}

const TagPage: NextPage<TagPageProps> = ({tag, posts, error}) =>  {

    if(error) {
        return <CustomError error={error} />
    }

    return (
        <div>
            <ListPostView posts={posts} />
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
    let postsReponse = await Promise.all<ApiResponse<Posts>>(tagResponse.data.attributes.posts.data.map((e) => {
        return GetPostBySlug(e.attributes.slug)
    })).then(e => {
        return e.map(el => {
            return el.data
        })
    })

    const tags: ApiResponse<Tags> = await GetTags()
    const global: ApiResponse<Global> = await GetGlobal();

    return {
        props: {
            tags: tags.data,
            global: global.data,
            tag: tagResponse.data ? tagResponse.data : null,
            posts: postsReponse ? postsReponse : null,
            error: tagResponse.error ? tagResponse.error : null
        },
        revalidate: 3600
    }
}

export default TagPage