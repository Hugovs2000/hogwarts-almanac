import { FaSolidPeopleGroup, FaSolidWandSparkles } from 'solid-icons/fa';
import { FiBook, FiHome } from 'solid-icons/fi';
import { TbTower } from 'solid-icons/tb';

export default function Drawer() {
  return (
    <div class="drawer-side">
      <label
        for="drawer-left"
        aria-label="close sidebar"
        class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 gap-4 bg-base-200 p-4 text-lg">
        <li>
          <div class="mx-2 flex-1 px-2">
            <a href="/home">Hogwarts Almanac</a>
          </div>
        </li>
        <li>
          <a href="/home">
            <FiHome />
            Home
          </a>
        </li>
        <li>
          <a href="/books">
            <FiBook />
            Books
          </a>
        </li>
        <li>
          <a href="/houses">
            <TbTower />
            Houses
          </a>
        </li>
        <li>
          <a href="/characters">
            <FaSolidPeopleGroup />
            Characters
          </a>
        </li>
        <li>
          <a href="/spells">
            <FaSolidWandSparkles />
            Spells
          </a>
        </li>
      </ul>
    </div>
  );
}
