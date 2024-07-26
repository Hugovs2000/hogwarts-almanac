import { FiMenu } from 'solid-icons/fi';

export default function Nav() {
  return (
    <div class="navbar w-full bg-base-300">
      <div class="flex-none lg:hidden">
        <label
          for="my-drawer-3"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost">
          <FiMenu size={24} />
        </label>
      </div>
      <div class="mx-2 flex-1 px-2">Hogwarts Almanac</div>
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal"></ul>
      </div>
    </div>
  );
}
