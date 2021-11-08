import axios from "axios";


export default async function Api(name,page) {
    const baseUrl = "https://pixabay.com/api/"
    const apiKey = "23111484-b23ce212a3b9e3a1a0d03b7eb"
    try {
        return  await (await axios.get(`${baseUrl}?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${apiKey}`)).data.hits;
    } catch (error) {
        //
        }
}