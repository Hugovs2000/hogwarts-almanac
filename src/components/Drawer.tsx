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
      </ul>
    </div>
  );
}
