import { useSignal, $, useComputed$ } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {
    const counter = useSignal(initialValue)

    const changeCounter = $((value: number) => {
        counter.value += value
    })
    return {
        counter: useComputed$(() => counter.value),
        changeCounter
    }
} 