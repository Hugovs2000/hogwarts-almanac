export default function Carousel() {
  return (
    <div class="flex w-full justify-center p-4 md:-translate-y-20">
      <div class="carousel carousel-center max-w-full space-x-4 rounded-box bg-neutral p-4">
        <a
          href="/books"
          class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
          <img
            src="/images/books.png"
            alt="Houses"
            class="w-44 object-contain"
          />
          <span>Books</span>
        </a>
        <a
          href="/houses"
          class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
          <img
            src="/images/Houses.png"
            alt="Houses"
            class="w-52 object-contain"
          />
          <span>Houses</span>
        </a>
        <a
          href="/characters"
          class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
          <img
            src="/images/characters.png"
            alt="Houses"
            class="w-36 object-contain"
          />
          <span>Characters</span>
        </a>
        <a
          href="spells"
          class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
          <img
            src="/images/spellcasting.png"
            alt="Houses"
            class="w-36 object-contain"
          />
          <span>Spells</span>
        </a>
      </div>
    </div>
  );
}
