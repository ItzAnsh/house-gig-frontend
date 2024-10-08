import { public_api } from "./api_client";

export const GigApi = {
    search: async (body, controller) => {
        const response = await public_api.post("/user/search", body, {
            signal: controller
        });
        return response;
    },
    details: async (gigId, controller) => {
        const response = await public_api.get(`/gig/${gigId}`, {
            signal: controller
        });
        return response;
    }
}