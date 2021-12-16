import axios from "axios"
import { Post, Posts } from "../../types/Post"
import { ApiResponse } from "../../types/utils/ApiResponse"

const headers = {
    headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
    }
}
export default async function handler(req, res) {
    const { id, slug, api_key } = req.query

    if(!api_key || api_key != process.env.BACKEND_API_TOKEN) {
        res.status(200).json({ error: {status: 403, message: "Not Authorized"} })
        return
    }

    if(req.method != "GET") { 
        res.status(200).json({ error: {status: 403, message: "Not Authorized"} })
        return
    }

    try {
        if(id) {
            const post: ApiResponse<Post> = await axios.get(`${process.env.BACKEND_URL}/api/posts/${id}?populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(post)
        } else if(slug) {
            const post: ApiResponse<Post> = await axios.get(`${process.env.BACKEND_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(post)
        } else {
            const posts: ApiResponse<Posts> = await axios.get(`${process.env.BACKEND_URL}/api/posts?populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(posts)
        }
    } catch(e) {
        res.status(200).json({ error: e.response.data.error })
    }
}