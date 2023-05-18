import { Slot, component$, useStylesScoped$, $, QRL, QwikMouseEvent } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
    visible: boolean;
    close: QRL<() => void>
}
export const Modal = component$(({ visible, close }: Props) => {
    useStylesScoped$(ModalStyles);

    const handleClickParent = $((event: QwikMouseEvent<HTMLDivElement, MouseEvent>, element: HTMLDivElement) => {
        // const target = event.target as HTMLElement;
        // const modalContent = element.querySelector('.modal-content');
        // if (!modalContent || modalContent.contains(target)) {
        //     return;
        // }
        close()
    });

    return (
        <div preventdefault:click class={visible ? 'modal-background' : 'hidden'} onClick$={handleClickParent} >
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
                            onClick$={close}
                        >
                            Cerrar
                        </button>
                        <Slot name='actions' />
                    </div>
                </div>
            </div>
        </div >
    )
});