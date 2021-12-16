import axios from "axios"
import { GlobalData } from "../../types/Global"
import { ApiResponse } from "../../types/utils/ApiResponse"

const headers = {
    headers: {
        'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
    }
}

export default async function handler(req, res) {
    if(req.method != "GET") { 
        res.status(200).json({ error: {status: 403, message: "Not Authorized"} })
        return
    }

    try {
        const globalData: ApiResponse<GlobalData> = await axios.get(`${process.env.BACKEND_URL}/api/global?populate=*`, headers)
        .then((res) => { return res.data })
        res.status(200).json(globalData)
    } catch(e) {
        res.status(200).json({ error: e.response.data.error })
    }
}