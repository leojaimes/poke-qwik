import { Slot, component$ } from "@builder.io/qwik";
import { Navbar } from "~/components/shared";

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