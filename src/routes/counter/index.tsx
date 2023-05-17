import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks";

export default component$(() => {
    const { counter, changeCounter } = useCounter(0)
    return (
        <>
            <span class="text-2xl">Counter</span>
            <span class="text-7xl">{counter.value}</span>
            <div class="mt-4">
                <buton onClick$={() => changeCounter(-1)} class="btn btn-primary mr-2 mt-2 cursor-pointer" >-1</buton>
                <buton onClick$={() => changeCounter(+1)} class="btn btn-primary cursor-pointer">+1</buton>
            </div>

        </>
    )
});