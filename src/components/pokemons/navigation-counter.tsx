import type { QRL} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const NavigationCounter  = component$(({ onChange }: { onChange: QRL<(value: number) => void>})=> {
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
      </div>
      </>
    )
})
