import { public_api } from "./api_client";

export const HomeApi = {
    home: async (controller) => {
        const response = await public_api.get("/public/home?g=9", {
            signal: controller
        });
        return response;
    }
}