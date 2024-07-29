import { FaSolidPeopleGroup, FaSolidWandSparkles } from 'solid-icons/fa';
import { FiBook } from 'solid-icons/fi';
import { TbTower } from 'solid-icons/tb';

export default function Drawer() {
  return (
    <div class="drawer-side">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-base-200 p-4">
        <li>
          <a href="/home">Home</a>
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
