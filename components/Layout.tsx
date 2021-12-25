import Head from "next/head"
import styled, { AnyStyledComponent } from "styled-components"
import { Global } from "../types/Global"
import { Socials } from "../types/Socials"
import { Tags } from "../types/Tags"
import Header from "./Header"
import NavBar from "./NavBar"

type LayoutPropsType = {
    children: React.ReactNode
    tags: Tags
    global: Global
    socials: Socials
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

export default function Layout({children, tags, global, socials, pageProps}: LayoutPropsType) {
    
    const postImgUrl = pageProps && pageProps.post ? pageProps.post.attributes.media.data.attributes.url : null

    return (
        <LayoutComponent>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>

            <NavBar tags={tags} global={global} />
            <Header global={global} postImg={postImgUrl} pageProps={pageProps} />
            
            <Container>
                {children}
            </Container>

            <div style={{position: "absolute", padding: "2rem 1rem", textAlign: "center", width: "100%", background: "grey"}}>
                <ul className="list-reset">
                    {
                        socials.data.filter(e => e.active).map((social, index) => {
                            return <li key={`social__${social.id}`}><a href={social.url}><img height="30px" width="30px" src={social.media.data.attributes.url} /></a></li>
                        })
                    }
                </ul>
                <div>Designed by @necromosis</div>
            </div>
        </LayoutComponent>
    )
}