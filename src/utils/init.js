import { HomeApi } from "@/api/home";
import { update_home } from "@/store/slices/home";
import { store } from "@/store/store";

export default async function init(){
    const { dispatch } = store;

    try {
        const [homeResponse] = await Promise.all([HomeApi.home()]);
    
        dispatch(update_home({
            gigs: homeResponse.data?.gigs,
            gigsters: homeResponse.data?.gigs,
        }));
    } catch(err){
        console.error(err);
    }
}