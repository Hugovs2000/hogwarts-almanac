import { FaSolidPeopleGroup, FaSolidWandSparkles } from 'solid-icons/fa';
import { FiBook } from 'solid-icons/fi';
import { TbTower } from 'solid-icons/tb';
import { createSignal } from 'solid-js';

export default function BottomNav() {
  const [active, setActive] = createSignal<string>('');

  const handleClick = (section: string) => {
    setActive(section);
  };

  return (
    <div class="btm-nav">
      <button
        class={active() === 'books' ? 'active' : ''}
        onClick={() => handleClick('books')}>
        <FiBook />
        <span class="btm-nav-label">Books</span>
      </button>
      <button
        class={active() === 'houses' ? 'active' : ''}
        onClick={() => handleClick('houses')}>
        <TbTower />
        <span class="btm-nav-label">Houses</span>
      </button>
      <button
        class={active() === 'characters' ? 'active' : ''}
        onClick={() => handleClick('characters')}>
        <FaSolidPeopleGroup />
        <span class="btm-nav-label">Characters</span>
      </button>
      <button
        class={active() === 'spells' ? 'active' : ''}
        onClick={() => handleClick('spells')}>
        <FaSolidWandSparkles />
        <span class="btm-nav-label">Spells</span>
      </button>
    </div>
  );
}
