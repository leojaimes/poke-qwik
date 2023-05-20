import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/shared";


export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
    const jwtCookie = cookie.get('jwt')
    if (jwtCookie) {
        console.log(`jwtCookie :::: ${jwtCookie}`)
        return;
    }

    redirect(302, '/login')
})
export default component$(() => {
    return (
        <>
            <Navbar />
            <div class="flex flex-col items-center justify-center mt-5">
                <span class="text-5xl">Admin Dashboard</span>
                <Slot />
            </div>
        </>
    )
});