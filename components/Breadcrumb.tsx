import React from "react"
import { PostData } from "../types/Post"
import { TagData } from "../types/Tags"

type BreadcrumbProps = {
    url?: string
    tag?: TagData
    post?: PostData
}

export default function Breadcrumb({url, tag, post}: BreadcrumbProps) {
    if(!url) {
        return <></>
    }

    const escapeLabel = ["articles", "tags"]
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_DOMAIN
    let labels = url.split("/").splice(1, url.length).map((e) => {
        if(escapeLabel.includes(e)) {
            return tag.label
        } else {
            if(post) {
                return post.title
            } else {
                return e
            }
        }
    })

    let urlFormat = url.split("/").splice(1, url.length)

    let hrefs = urlFormat.map((e, index) => {
        if(escapeLabel.includes(e)) {
            return "tags/"+tag.slug
        } else if(index == urlFormat.length-1) {
            return url.substring(1, url.length)
        } else {
            return e
        }
    })
    
    let finalResult = labels.map((e, index) => {
        if(index > 0) {
            if(hrefs[index-1] == hrefs[index]) {
                return null
            }
            return {label: e, href: hrefs[index]}
        } else {
            return {label: e, href: hrefs[index]}
        }
    })

    finalResult = finalResult.filter((e) => {
        return e != null
    })

    return (
        <div style={{position: "relative", padding: "0 15%", marginTop: "0.5rem", marginBottom: "0.8rem", fontSize: "12px"}}>
            <a href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`}>{`Home`}</a><span>{` > `}</span>
            {
                finalResult.map((e, index) => {
                    if(index == finalResult.length-1) {
                        return <React.Fragment key={index}><a style={{textDecoration: "underline"}} href={`${baseUrl}/${e.href}`}>{e.label}</a>{index != finalResult.length-1 && <span>{` > `}</span>}</React.Fragment>
                    }
                    return <React.Fragment key={index}><a href={`${baseUrl}/${e.href}`}>{e.label}</a>{index != finalResult.length-1 && <span>{` > `}</span>}</React.Fragment>
                })
            }
        </div>
    )
}