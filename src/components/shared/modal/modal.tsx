import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';
export const Modal = component$(() => {
    useStylesScoped$(ModalStyles);
    return (

        <div class="modal-background">
            <div class="modal-content">
                <div class="mt-3 text-center">
                    <h3 class="modal-title">Titulo del Modal</h3>
                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nesciunt nihil similique veniam officiis fuga minus.
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
                    </div>
                </div>
            </div>
        </div>
    )
});