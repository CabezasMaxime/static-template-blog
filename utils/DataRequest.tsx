import axios from "axios"
import Contact from "../pages/contact"

const headers = {
    headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
    }
}

export async function GetGlobal() {
    try {
        const global = await axios.get(`${process.env.BACKEND_URL}/api/global?populate=*`, headers)
        .then((res) => { return res.data })
        return global
    } catch(e: any) {
        //console.log("API ERROR GetGlobal", e)
    }
}

export async function GetTags() {
    try {
        const tags = await axios.get(`${process.env.BACKEND_URL}/api/tags?populate=*`, headers)
        .then((res) => { return res.data })
        return tags
    } catch(e: any) {
        //console.log("API ERROR GetTags", e)
    }
}

export async function GetTagBySlug(slug: string) {
    try {
        const tag = await axios.get(`${process.env.BACKEND_URL}/api/tags?filters[slug][$eq]=${slug}&populate[0]=posts.media`, headers)
        .then((res) => { return res.data })
        tag.data = tag.data[0]
        return tag
    } catch(e: any) {
        //console.log("API ERROR GetTagsBySlug", e)
    }
}

export async function GetPosts() {
    try {
        const posts = await axios.get(`${process.env.BACKEND_URL}/api/posts?populate=*`, headers)
        .then((res) => { return res.data })
        return posts
    } catch(e: any) {
        //console.log("API ERROR GetPosts", e)
    }
}

export async function GetPostBySlug(slug: string) {
    try {
        const post = await axios.get(`${process.env.BACKEND_URL}/api/posts?filters[slug][$eq]=${slug}&populate[author][populate][0]=posts,avatar&populate[tags][populate][0]=tags&populate[media][populate][0]=media`, headers)
        .then((res) => { return res.data })
        post.data = post.data[0]
        return post
    } catch(e: any) {
        //console.log("API ERROR GetPostsBySlug", e)
    }
}

export async function GetSocials() {
    try {
        const social = await axios.get(`${process.env.BACKEND_URL}/api/social?populate[0]=socialLink.media`, headers)
        .then((res) => { return res.data })
        return social.data.attributes.socialLink
    } catch(e: any) {
        //console.log("API ERROR GetSocials", e)
    }
}

export async function GetContact() {
    try {
        const contact = await axios.get(`${process.env.BACKEND_URL}/api/contact`, headers)
        .then((res) => { return res.data })
        return contact.data.attributes
    } catch(e: any) {
        //console.log("API ERROR GetSocials", e)
    }
}