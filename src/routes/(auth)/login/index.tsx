import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './login.css?inline';
export default component$(() => {
    useStylesScoped$(styles);

    return (
        <form class="login-form mt-5">
            <div class="relative">
                <input name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type="submit">Ingresar</button>
            </div>

            <p>



            </p>


            <code>

            </code>
        </form>
    )

});