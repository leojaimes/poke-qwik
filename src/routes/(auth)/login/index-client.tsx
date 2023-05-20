import {
    component$,
    useStore,
    useStylesScoped$,
    $,
    QwikSubmitEvent,
    QwikFocusEvent,
    useSignal,
    useComputed$,
} from '@builder.io/qwik';
import styles from './login.css?inline';
export default component$(() => {
    useStylesScoped$(styles);
    const formState = useStore({
        email: '',
        password: 'pass123',
        posted: false,
    });
    const emailValid = useSignal(true)

    const isValidEmail = $((email: string) => {
        const emailExpresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const isValid = emailExpresion.test(email);
        console.log(`isValid ${isValid}`)
        return isValid;
    })

    const isValidPassword = $((password: string) => {
        return true;
    })

    const onBlurEmail = $(async (e: QwikFocusEvent<HTMLInputElement>) => {
        console.log('onBlurEmail ' + e.target.value)
        emailValid.value = await isValidEmail(e.target.value)
    })

    // const emailError = useComputed$(() => {
    //     return isValidEmail(formState.email)
    // })

    const isFormValid = useComputed$(async () => {
        const isEmailValid = await isValidEmail(formState.email)
        const isPasswordValid = await isValidPassword(formState.password)
        return isEmailValid && isPasswordValid
    })
    const onSubmit = $(async () => {
        const { email, password } = formState;
        console.log('form invalid ' + isFormValid.value)
        if (!isFormValid.value) {
            console.log('form invalid')
            return
        }
    });
    return (
        <form onSubmit$={onSubmit} class="login-form mt-5" preventdefault:submit>
            <div class="relative">
                <input
                    onInput$={(ev) => {
                        formState.email = (ev.target as HTMLInputElement).value;
                    }}
                    value={formState.email}
                    name="email"
                    type="text"
                    placeholder="Email address"
                    class={!emailValid.value ? "not-valid" : ""}
                    onBlur$={onBlurEmail}
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                    onInput$={(ev) => {
                        formState.password = (ev.target as HTMLInputElement).value;
                    }}
                    value={formState.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type="submit">Ingresar</button>
            </div>

            <p></p>

            <code>{JSON.stringify(formState, undefined, 2)}</code>
        </form>
    );
});
