import { useLocation } from '@solidjs/router';
import { FaSolidPeopleGroup, FaSolidWandSparkles } from 'solid-icons/fa';
import { FiBook } from 'solid-icons/fi';
import { TbTower } from 'solid-icons/tb';
import { createEffect, createSignal } from 'solid-js';

export default function BottomNav() {
  const location = useLocation();
  const [active, setActive] = createSignal('');

  createEffect(() => {
    setActive(location.pathname.split('/')[1]);
  });

  return (
    <div class="btm-nav md:invisible">
      <a
        href="/books"
        class={active() === 'books' ? 'active' : ''}
        onClick={() => setActive('books')}>
        <FiBook />
        <span class="btm-nav-label">Books</span>
      </a>
      <a
        href="/houses"
        class={active() === 'houses' ? 'active' : ''}
        onClick={() => setActive('houses')}>
        <TbTower />
        <span class="btm-nav-label">Houses</span>
      </a>
      <a
        href="/characters"
        class={active() === 'characters' ? 'active' : ''}
        onClick={() => setActive('characters')}>
        <FaSolidPeopleGroup />
        <span class="btm-nav-label">Characters</span>
      </a>
      <a
        href="/spells"
        class={active() === 'spells' ? 'active' : ''}
        onClick={() => setActive('spells')}>
        <FaSolidWandSparkles />
        <span class="btm-nav-label">Spells</span>
      </a>
    </div>
  );
}
