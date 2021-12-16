import styled, { AnyStyledComponent } from "styled-components"
import { Global } from "../types/Global";
import Image from "next/image";

const HeaderComponent: AnyStyledComponent = styled.div`
    position: relative;
    background: #333333;
`

type HeaderProps = {
    global: Global
    postImg?: string
}

export default function Header({ global, postImg }: HeaderProps) {
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
                    </div>
                )
                : <div style={{display: "flex", background: "#333333", height: "50vh", color: "white", fontSize: "50px"}}><div style={{margin: "auto"}}><p>No Header Image</p><p style={{fontSize: "14px", textAlign: "center"}}>( Choose image in backend, "Global header" )</p></div></div>
            }

        </HeaderComponent>
    )
}