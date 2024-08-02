export default function Header() {
  return (
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
          src="/images/HarryPotterLogo.png"
          alt="Harry Potter logo"
          class="w-56 md:min-w-96"
        />
      </div>
    </div>
  );
}
