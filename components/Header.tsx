import styled, { AnyStyledComponent } from "styled-components"
import { Global } from "../types/Global";
import Image from "next/image";
import { useRouter } from "next/router";

const HeaderComponent: AnyStyledComponent = styled.div`
    position: relative;
    background: #333333;
`

type HeaderProps = {
    global: Global
    postImg?: string
    pageProps: any
}

export default function Header({ global, postImg, pageProps }: HeaderProps) {
    if(!global) {
        return <div>Loading ...</div>
    }

    const getCurrentLabel = () => {
        if(!pageProps || pageProps.post) {
            return null
        }

        if(pageProps.title) {
            return pageProps.title
        }
        
        return pageProps.tag && pageProps.tag.attributes.label ? pageProps.tag.attributes.label : "Home"
    }

    let currentLabel = getCurrentLabel()

    return (
        <HeaderComponent>
            {
                global.attributes.header.data
                ?
                (
                    <div style={{display: "block", position: "relative", width: "100%", height: "60vh", overflow: "visible"}}>
                        <Image
                            src={postImg ? postImg : global.attributes.header.data.attributes.url}
                            quality="100"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="50% 50%"
                            sizes="100vw"
                            alt={global.attributes.header.data.attributes.alternativeText}
                        />
                        {
                            currentLabel && (
                                <div style={{position: "absolute", textAlign: "right", fontWeight: 800, bottom: "0", fontSize: "55px", color: "white", width: "100%", height: "auto", margin: "0", background: "rgba(0, 0, 0, 0.8)"}}>
                                    <p style={{margin: "0", padding: "10px 10px"}}>{currentLabel}</p>
                                </div>
                            )
                        }
                    </div>
                )
                : <div style={{display: "flex", background: "#333333", height: "50vh", color: "white", fontSize: "50px"}}><div style={{margin: "auto"}}><p>No Header Image</p><p style={{fontSize: "14px", textAlign: "center"}}>{`( Choose image in backend, "Global header" )`}</p></div></div>
            }
        </HeaderComponent>
    )
}