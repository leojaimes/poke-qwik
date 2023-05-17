import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';
export const Modal = component$(() => {
    useStylesScoped$(ModalStyles);
    return (

        <div class="modal-background">
            <div class="modal-content">
                <div class="mt-3 text-center">
                    <h3 class="modal-title"><Slot name='title' /></h3>
                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content' />
                        </div>
                    </div>
                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button"
                        >
                            Cerrar
                        </button>
                        <Slot name='actions' />
                    </div>
                </div>
            </div>
        </div>
    )
});