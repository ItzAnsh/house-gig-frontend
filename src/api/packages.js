import { private_api } from "./api_client";

export const PackagesApi = {
    packageFromGigId: async (body, controller) => {
        const response = await private_api.post("/packages/findByGigId", body, {
            signal: controller
        });
        return response;
    }
}