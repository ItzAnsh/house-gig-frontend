import { public_api } from "./api_client";

export const AccountApi = {
    login: async (body) => {
        const response = await public_api.post("/user/login", body);
        return response;
    },
    register: async (body) => {
        const response = await public_api.post("/user/register", body);
        return response;
    }
}