import { GetStaticProps, NextPage } from "next"
import CustomError from "../../components/CustomError"
import { Posts } from "../../types/Post"
import { ApiError } from "../../types/utils/ApiError"
import { GetAllTags, GetOnePost, GetOneTagBySlug } from "../../utils/DataRequest"
import { ApiResponse } from "../../types/utils/ApiResponse"
import ListPostView from "../../components/ListPostView"
import { Tag, TagData, Tags } from "../../types/Tags"
import { ResourcesData } from "../../types/utils/Resources"

type TagPageProps = {
    tag: ResourcesData<TagData>,
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
    let tagsResponse: ApiResponse<Tags> = await GetAllTags()

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
    let tagResponse: ApiResponse<Tag> = await GetOneTagBySlug(context.params.slug)
    let postsReponse = await Promise.all(tagResponse.data.attributes.posts.data.map((e) => {
        return GetOnePost(e.id)
    })).then(e => {
        return e.map(el => {
            return el.data
        })
    })

    return {
        props: {
            tag: tagResponse.data ? tagResponse.data : null,
            posts: postsReponse ? postsReponse : null,
            error: tagResponse.error ? tagResponse.error : null
        }
    }
}

export default TagPage