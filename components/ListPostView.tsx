import styled, { AnyStyledComponent } from 'styled-components'
import { Post, Posts, PostData } from "../types/Post"
import Image from "next/image"
import Link from "next/link"
import { ResourcesData } from '../types/utils/Resources'

const ArticleCard: AnyStyledComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 300ms;
  
  &:hover {
    box-shadow: 0 3px 8px 0.2px rgba(0, 0, 0, 0.3);
    transition: 500ms;
  }

  h2 {
    padding: 0;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  &:hover > .articlce-image-header > .article-overlay-filter {
    background: rgba(0, 0, 0, 0.0);
    cursor: pointer;
    transition: 300ms;
  }

  &:hover > .articlce-image-header > .article-image-container {
    width: 100%;
    height: 100%;
    transition: 800ms;
  }

  .articlce-image-header {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 200px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .article-overlay-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
    transition: 300ms;
  }

  .article-image-container {
    position: absolute;
    width: 110%;
    height: 110%;
    transition: 300ms;
  }

  .article-description {
    whiteSpace: nowrap;
    overflow: hidden;
    textOverflow: ellipsis;
    height: auto;
  }

  .article-bottom {
    padding: 1rem;
    background: white;
  }
`

const ArticlesContentWrapper: AnyStyledComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 5rem;
    
    width: 80%;
    margin: 2rem auto;
    align-items: center;
    justify-content: center;

    a {
      flex: 1 1 29%;
      min-width: 300px;
    }
`

type ListPostViewProps = {
    posts: ResourcesData<PostData>[]
}

export default function ListPostView({posts}: ListPostViewProps) {

  return (
      <ArticlesContentWrapper>
      {
        [...posts, ...posts, ...posts, ...posts].map((post: ResourcesData<PostData>, index) => {
          return (
            <Link key={`article__preview__${index}`} href={`/articles/${post.attributes.slug}`}>
              <a>
                <ArticleCard>
                  <div className="articlce-image-header">
                    <div className="article-overlay-filter"></div>
                    <div className="article-image-container">
                      <Image src={post.attributes.media.data.attributes.url} layout="fill" objectFit="cover" objectPosition="50% 50%" alt={post.attributes.media.data.attributes.alternativeText} />
                    </div>
                  </div>
                  <div className="article-bottom">
                    <h2>{post.attributes.title}</h2>
                    <div className="article-description">{post.attributes.description}</div>
                  </div>
                </ArticleCard>
              </a>
            </Link>
          )
        })
      }
    </ArticlesContentWrapper>
  )
}