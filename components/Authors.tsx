import { Author } from "../types/Author"
import styled from "styled-components"
import Image from "next/image"

type HeroProps = {
    author: Author
}

const HeroStyled = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
    padding: 1rem 0;
    background: white;

    div {
        margin: 0 1rem;
    }

    .wrapper__image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        
        .image {
            position: relative;
            width: 70px;
            height: 70px;
            border-radius: 70px;
            overflow: hidden;
            box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.3);
            background: linear-gradient(120deg, cyan 0%, purple 80%);
        }
    }

    .wrapper__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1rem 0;
        border-left: solid 3px lightgrey;

        .description {
            font-size: 14px;
            line-height: 22px;
        }

        .username {
            font-weight: 600;
            margin-bottom: 1rem;
        }
    }
`

export default function Hero({author}: HeroProps) {
    return (
        <HeroStyled>
            <div className="wrapper__image">
                <div className="image">
                    <Image src={author.avatar.data.attributes.url} layout="fill" objectFit="cover" />
                </div>
            </div>
            <div className="wrapper__content">
                <div className="username">{author.username}</div>
                <div className="description">{author.description} {author.description} {author.description} {author.description}</div>
            </div>
        </HeroStyled>
    )
}