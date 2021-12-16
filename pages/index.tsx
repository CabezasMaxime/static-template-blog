import { GetStaticProps, NextPage } from "next"
import styled, { AnyStyledComponent } from 'styled-components'
import CustomError from "../components/CustomError"
import { Posts } from "../types/Post"
import { GetPosts } from "../utils/DataRequest"
import { ApiError } from "../types/utils/ApiError"
import ListPostView from "../components/ListPostView"
import { ApiResponse } from "../types/utils/ApiResponse"

const Title: AnyStyledComponent = styled.div`
  font-size: ${({theme}) => theme.fontSize.xl};
  color: ${({theme}) => theme.colors.primary};
  font-weight: bolder;
`

const Description: AnyStyledComponent = styled.div`
  font-size: ${({theme}) => theme.fontSize.sm};
  color: ${({theme}) => theme.colors.black};
`

type HomeProps = {
  posts?: Posts
  error?: ApiError
}

const Home: NextPage<HomeProps> = ({posts, error}) => {


  if(error) {
    return <CustomError error={error} />
  }

  return (
    <div>
      
      <Title>mk-blog-template</Title>
      <Description>Static blog generate with Next-JS, Gist as Database, Styled Component and Framer-motion for Design.</Description>
      
      <ListPostView posts={posts} />
      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let postsReponse: ApiResponse<Posts> = await GetPosts()
  
  return {
    props: {
      posts: postsReponse.data ? postsReponse.data : null,
      error: postsReponse.error ? postsReponse.error : null
    }
  }
}

export default Home