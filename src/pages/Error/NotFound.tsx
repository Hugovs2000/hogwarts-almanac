import { FiHome } from 'solid-icons/fi';

export default function NotFound() {
  return (
    <div class="flex flex-col items-center gap-4 p-6 text-center">
      <h1 class="max-w-96 text-lg">
        The page you are looking for does not exist. Please check the url or
        return home.
      </h1>
      <a href="/home" class="btn btn-ghost bg-neutral">
        <FiHome /> Home
      </a>
    </div>
  );
}
