import type { JSXChildren, QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";


interface Props {
  onChange: QRL<(value: number) => void>;
  children?: JSXChildren
}

export const NavigationCounter = component$(({ onChange, children }: Props) => {
  return (
    <>
      <div class="mt-2">
        <button
          onClick$={() => {
            onChange(-1);
          }}
          class="btn btn-primary mr-2 "
        >
          Previous
        </button>
        <button
          onClick$={() => {
            onChange(1)
          }}
          class="btn btn-primary"
        >
          Next
        </button>

        {children}

      </div>
    </>
  )
})
