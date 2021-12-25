import { GetStaticProps, NextPage } from "next"
import CustomError from "../../components/CustomError"
import { Post, PostData, Posts } from "../../types/Post"
import { ApiError } from "../../types/utils/ApiError"
import { ResourcesData } from "../../types/utils/Resources"
import { GetPostBySlug, GetPosts } from "../../utils/DataRequest"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ApiResponse } from "../../types/utils/ApiResponse"
import styled from "styled-components"
import Hero from "../../components/Authors"
import Image from "next/image"
import Breadcrumb from "../../components/Breadcrumb"
import { useRouter } from "next/router"
import ReactMKComponents from "../../components/markdown/ReactMkComponents"

type ArticleProps = {
    post: ResourcesData<PostData>,
    error: ApiError
}

const ArticleContainer = styled.div(({theme}) => `
    padding: 0 15%;

    .container {
        background: white;
        padding: 0.2rem 2rem;
    }

    .img-contain {
        width: 80%;
        .img-border {
            border: solid 2px black !important;
        }
    }

    .image-container {
        position: relative;
        border: solid 1px black;
        width: 60%;
        height: 100px;
        left: 50%;
        transform: translateX(-50%)
    }
    
    @media(${theme.media.mobile}) {
        padding: 0 0rem;

        .container {
            padding: 0.2rem 1rem;
        }

        .img-contain {
            width: 100%;
        }
    }
`)

const Articles: NextPage<ArticleProps> = ({post, error}) =>  {
    const router = useRouter()

    if(error || !post) {
        return <CustomError error={error ? error : {status: 404}} />
    }

    return (
        <>
            <Breadcrumb url={router.asPath} tag={post.attributes.tags.data[0].attributes} post={post.attributes} />
            <ArticleContainer>
                
                <div className="container">
                    <h1>{post.attributes.title}</h1>
                    <p>{post.attributes.description}</p>

                    <div style={{display: "block", position: "relative", height: "auto"}}>
                        <Image
                            src={post.attributes.media.data.attributes.url}
                            layout="responsive"
                            className="simple-border"
                            width="16"
                            height="9"
                            objectFit="contain"
                            alt={post.attributes.media.data.attributes.alternativeText}
                        />
                    </div>

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={ReactMKComponents}
                    >
                        {post.attributes.content}
                    </ReactMarkdown>
                    <p>{post.attributes.publishedAt}</p>
                    <p>{post.attributes.updatedAt}</p>
                </div>

                <Hero author={post.attributes.author.data.attributes} />
            </ArticleContainer>
        </>
    )
}

export const getStaticPaths = async () => {
    let postsResponse: ApiResponse<Posts> = await GetPosts()

    if(!postsResponse || postsResponse.error) {
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
    let postReponse: ApiResponse<Post> = await GetPostBySlug(context.params.slug as string)

    if(!postReponse) {
        return {
            props: {
                post: null,
                error: {status: 404, name: "Not Found", message: "Not Found"}
            }
        }
    }
    return {
        props: {
            post: postReponse.data ? postReponse.data : null,
            error: postReponse.error ? postReponse.error : null
        },
        revalidate: 3600
    }
}

export default Articles