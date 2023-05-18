import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/qwik';
import styles from './navbar.module.css';
import { Link } from '@builder.io/qwik-city';

export const Navbar = component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </Link>
        </div>
        <ul>

          <li>
            <Link href='/pokemons/list-ssr/'>list - SSR </Link>
          </li>

          <li>
            <Link href='/pokemons/list-client/'>list - Client </Link>
          </li>

          <li>
            <Link href='/counter'>Counter </Link>
          </li>

          <li>
            <Link href='/login'>Login</Link>
          </li>

          <li>
            <Link href='/dashboard'>Admin Dasboard </Link>
          </li>



        </ul>
      </div>
    </header>
  );
});
