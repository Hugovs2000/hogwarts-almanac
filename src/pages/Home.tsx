export default function Home() {
  return (
    <div class="flex h-full w-full flex-col">
      <div class="relative z-0 w-full">
        <video
          autoplay
          muted
          loop
          playsinline
          src="https://cdn-hogwartslegacy.warnerbrosgames.com/home/hero.mp4?c=b"
          class="left-0 top-0 max-h-96 w-full object-cover object-center"></video>
        <div class="absolute top-1/3 flex w-full justify-center">
          <img
            src="src/assets/images/HarryPotterLogo.png"
            alt="Harry Potter logo"
            class="w-56 md:min-w-96"
          />
        </div>
      </div>
      <div class="flex w-full justify-center p-4 md:-translate-y-20">
        <div class="carousel carousel-center max-w-full space-x-4 rounded-box bg-neutral p-4">
          <a
            href="/books"
            class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
            <img
              src="src/assets/images/books.png"
              alt="Houses"
              class="w-44 object-contain"
            />
            <span>Books</span>
          </a>
          <a
            href="/houses"
            class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
            <img
              src="src/assets/images/Houses.png"
              alt="Houses"
              class="w-52 object-contain"
            />
            <span>Houses</span>
          </a>
          <a
            href="/characters"
            class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
            <img
              src="src/assets/images/characters.png"
              alt="Houses"
              class="w-36 object-contain"
            />
            <span>Characters</span>
          </a>
          <a
            href="spells"
            class="carousel-item flex h-60 w-52 flex-col items-center justify-between">
            <img
              src="src/assets/images/spellcasting.png"
              alt="Houses"
              class="w-36 object-contain"
            />
            <span>Spells</span>
          </a>
        </div>
      </div>
    </div>
  );
}
