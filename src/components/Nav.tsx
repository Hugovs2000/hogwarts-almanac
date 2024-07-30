import { FiMenu } from 'solid-icons/fi';

export default function Nav() {
  return (
    <div class="navbar w-full bg-base-300">
      <div class="flex-none lg:hidden">
        <label
          for="drawer-left"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost">
          <FiMenu size={24} />
        </label>
      </div>
      <div class="mx-2 flex-1 px-2">
        <a href="/home">Hogwarts Almanac</a>
      </div>
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal">
          <div class="flex items-center gap-2">
            <li>
              <a href="/books">Books</a>
            </li>
            <li>
              <a href="/houses">Houses</a>
            </li>
            <li>
              <a href="/characters">Characters</a>
            </li>
            <li>
              <a href="/spells">Spells</a>
            </li>
          </div>
          <div class="divider divider-horizontal m-0"></div>
          <li>
            <a href="/home">Home</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
