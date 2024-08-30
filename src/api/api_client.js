import axios from "axios";

const baseURL = "http://localhost:4000";
export const public_api = axios.create({
    baseURL: `${baseURL}`
})