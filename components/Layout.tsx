import Head from "next/head"
import styled, { AnyStyledComponent } from "styled-components"
import { Global } from "../types/Global"
import { Tags } from "../types/Tags"
import Header from "./Header"
import NavBar from "./NavBar"

type LayoutPropsType = {
    children: React.ReactNode
    tags: Tags
    global: Global
    pageProps: any
}

const Container: AnyStyledComponent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin: auto;
    font-size: ${({theme}) => theme.fontSize.sm};
    color: ${({theme}) => theme.colors.black};
`

const LayoutComponent: AnyStyledComponent = styled.div`
    width: 100%;
`

export default function Layout({children, tags, global, pageProps}: LayoutPropsType) {
    const postImgUrl = pageProps.post ? pageProps.post.attributes.media.data.attributes.url : null
    return (
        <LayoutComponent>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <NavBar tags={tags} global={global} />
            <Header global={global} postImg={postImgUrl} />

            <Container>
                {children}
            </Container>
            <div style={{position: "absolute", padding: "2rem 1rem", textAlign: "center", width: "100%", background: "grey"}}>
                <div>Designed by @necromosis</div>
            </div>
        </LayoutComponent>
    )
}