import Carousel from './components/Carousel';
import Header from './components/Header';

export default function Home() {
  return (
    <div class="flex h-full w-full flex-col">
      <Header />
      <Carousel />
      <p class="p-4 text-center">
        Test your knowledge with the{' '}
        <a href="/quiz" class="link">
          Spells Quiz
        </a>
      </p>
    </div>
  );
}
