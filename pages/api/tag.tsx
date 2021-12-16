import axios from "axios"
import { Tag, Tags } from "../../types/Tags"
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
            const tag: ApiResponse<Tag> = await axios.get(`${process.env.BACKEND_URL}/api/tags/${id}?populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(tag)
        } else if(slug) {
            const tag: ApiResponse<Tag> = await axios.get(`${process.env.BACKEND_URL}/api/tags?filters[slug][$eq]=${slug}&populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(tag)
        } else {
            const tags: ApiResponse<Tags> = await axios.get(`${process.env.BACKEND_URL}/api/tags?populate=*`, headers)
            .then((res) => { return res.data })
            res.status(200).json(tags)
        }
    } catch(e) {
        res.status(200).json({ error: e.response.data.error })
    }
}