import axios from "axios"
import { Global } from "../types/Global"
import { Posts, Post } from "../types/Post"
import { Tag, Tags } from "../types/Tags"
import { ApiResponse } from "../types/utils/ApiResponse"

export async function GetGlobal(): Promise<ApiResponse<Global>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/global?api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}

export async function GetPosts(): Promise<ApiResponse<Posts>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/post?api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}

export async function GetOnePost(id): Promise<ApiResponse<Post>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/post?id=${id}&api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}

export async function GetOnePostBySlug(slug): Promise<ApiResponse<Post>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/post?slug=${slug}&api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data[0]} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}

export async function GetAllTags(): Promise<ApiResponse<Tags>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/tag?api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}

export async function GetOneTagBySlug(slug): Promise<ApiResponse<Tag>> {
    return await axios.get(`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/api/tag?slug=${slug}&api_key=${process.env.BACKEND_API_TOKEN}`)
    .then((res) => { return {data: res.data.data[0]} })
    .catch(e => {
        let {status, name, message} = e.toJSON()
        return {error: {status, name, message}}
    })
}