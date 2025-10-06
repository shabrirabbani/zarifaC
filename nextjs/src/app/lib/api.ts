import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL

export async function getStrapiData(path:String) {
    try {
        const response = axios.get(`${baseURL}${path}`)
        return response
    } catch (error) {
        console.log(error)
    }
}