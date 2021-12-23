import { useState } from "react"
import styled from "styled-components"
import Image from "next/image"

const ImageContainer = styled.div(({theme, props}) => {
    return `
        display: block;
        position: relative;
        margin: auto;
        width: ${props && props == "horizontal" ? "30%" : "80%"};

        .img-border {
            border: solid 1px black !important;
        }

        @media(${theme.media.mobile}) {
            width: ${props && props == "horizontal" ? "60%" : "100%"};
        }
    `
})

export default function MkImage({className, src, ...props}) {
    const [size, setSize] = useState(["16", "9"])
    const [direction, setDirection] = useState("horizontal")
    const [loaded, setLoaded] = useState(false)

    if(loaded) {
        return (
            <ImageContainer props={direction}>
                <Image
                    className="img-border"
                    src={src}
                    layout="responsive"
                    width={size[1]}
                    height={size[0]}
                    objectFit="fill"
                    alt={props.alt}
                />
                <p style={{textAlign: "center", width: "100%", color: "grey", fontSize: "12px", marginTop: "0.5rem"}}><i>{props.alt}</i></p>
            </ImageContainer>
        )
    }

    return (
        <ImageContainer>
            <Image
                className="img-border"
                src={src}
                onLoadingComplete={(data) => {
                    if(data.naturalHeight > data.naturalWidth) {
                        setSize(["16", "9"])
                        setDirection("horizontal")
                        setLoaded(true)
                    } else {
                        setSize(["9", "16"])
                        setDirection("vertical")
                        setLoaded(true)
                    }
                }}
                layout="responsive"
                width={size[1]}
                height={size[0]}
                objectFit="fill"
                alt={props.alt}
            />
            <p style={{textAlign: "center", width: "100%", color: "grey", fontSize: "12px", marginTop: "0.5rem"}}><i>{props.alt}</i></p>
        </ImageContainer>
    )
}