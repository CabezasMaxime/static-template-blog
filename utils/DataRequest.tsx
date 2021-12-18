import axios from "axios"

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
        const tag = await axios.get(`${process.env.BACKEND_URL}/api/tags?filters[slug][$eq]=${slug}&populate=*`, headers)
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
        const post = await axios.get(`${process.env.BACKEND_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`, headers)
        .then((res) => { return res.data })
        post.data = post.data[0]
        return post
    } catch(e: any) {
        //console.log("API ERROR GetPostsBySlug", e)
    }
}