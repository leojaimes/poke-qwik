import {
    component$,
    useStylesScoped$,
} from '@builder.io/qwik';
import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {

    const { email, password } = data
    console.log({ email, password })

    if (email === 'leo@gmail.com' && password === '123456') {
        cookie.set('jwt', 'my_jwt', { secure: true, path: '/' })
        redirect(302, '/')
        return {
            success: true,
            jwt: 'jwt'
        }
    }
    return {
        success: false,
        error: 'error!!'
    }

},
    zod$({
        email: z.string().email('Invalid Email'),
        password: z.string().min(6, 'Password must have minimun 6 characters')
    })

)
export default component$(() => {
    useStylesScoped$(styles);
    const action = useLoginUserAction()


    return (
        <Form action={action} class="login-form mt-5"  >
            <div class="relative">
                <input
                    name="email"
                    type="text"
                    placeholder="Email address"
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type="submit">Ingresar</button>
            </div>

            <p>{action.value?.success && (<code>Authenticated: Token:  {action.value.jwt}</code>)}
            </p>

            <code>{JSON.stringify(action.value, undefined, 2)}</code>
        </Form>
    );
});
