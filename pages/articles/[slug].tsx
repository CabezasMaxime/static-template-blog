import { GetStaticProps, NextPage } from "next"
import CustomError from "../../components/CustomError"
import Link from "next/link"
import { Post, PostData, Posts } from "../../types/Post"
import { ApiError } from "../../types/utils/ApiError"
import { ResourcesData } from "../../types/utils/Resources"
import { GetOnePostBySlug, GetPosts } from "../../utils/DataRequest"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ApiResponse } from "../../types/utils/ApiResponse"
import styled from "styled-components"

type ArticleProps = {
    post: ResourcesData<PostData>,
    error?: ApiError
}

const ArticleContainer = styled.div(({theme}) => `
    padding: 0 20%;

    @media(${theme.media.mobile}) {
        padding: 0 1rem;
    }
`)

const Articles: NextPage<ArticleProps> = ({post, error}) =>  {

    if(error) {
        return <CustomError error={error} />
    }

    return (
        <ArticleContainer>
            <h1>{post.attributes.title}</h1>
            <p>{post.attributes.description}</p>
            <div>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({node, inline, className, children, ...props}) {
                            return <code style={{whiteSpace: "pre-wrap"}} className={className} {...props}>{children}</code>
                        },
                        blockquote({className, children, ...props}) {
                            return <blockquote className={className} {...props}>{children}</blockquote>
                        },
                        a({className, children, href, rel, ...props}) {
                            return (
                                <Link href={href ? href : "/#"}>
                                    <a className="link" rel={rel} {...props}>{children}</a>
                                </Link>
                            )
                        },
                        table({className, children, ...props}) {
                            return (
                                <div style={{overflowX: "auto"}}>{children}</div>
                            )
                        }
                    }}
                >
                    {post.attributes.content}
                </ReactMarkdown>
            </div>
            <p>{post.attributes.publishedAt}</p>
            <p>{post.attributes.updatedAt}</p>
            <p>Author: {post.attributes.author.data.attributes.username}</p>
        </ArticleContainer>
    )
}

export const getStaticPaths = async () => {
    let postsResponse: ApiResponse<Posts> = await GetPosts()

    if(postsResponse.error) {
        return {
            paths: [],
            fallback: true,
        }
    }

    let tableOfPaths = postsResponse.data.map((e)=> {
        return { params: {slug: e.attributes.slug}}
    })

    return {
        paths: tableOfPaths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    let postReponse: ApiResponse<Post> = await GetOnePostBySlug(context.params.slug)

    return {
        props: {
            post: postReponse.data ? postReponse.data : null,
            error: postReponse.error ? postReponse.error : null
        }
    }
}

export default Articles