import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import FailedToFind from '../components/FailedToFind';
import { getCharacters } from '../services/api.service';

export default function Characters() {
  const characters = createQuery(() => ({
    queryKey: ['getCharacters'],
    queryFn: () => getCharacters(),
  }));

  return (
    <>
      <div class="relative">
        <img
          src="/images/books-bg.webp"
          class="h-72 w-full object-cover object-center md:h-96"
        />
        <div class="absolute top-4 w-full flex-col text-center sm:top-8 md:top-20">
          <h1 class="mx-auto w-fit text-center text-2xl">Characters</h1>
          <p class="mx-auto max-h-60 max-w-96 text-ellipsis">
            The Harry Potter series is renowned for its rich cast of characters,
            each contributing to the magical world created by J.K. Rowling. From
            the courageous trio of Harry Potter, Hermione Granger, and Ron
            Weasley to the enigmatic Dumbledore and the dark Lord Voldemort,
            each character brings unique depth and intrigue. Their journeys,
            relationships, and growth are central to the series' enduring
            appeal, captivating readers and viewers alike.
          </p>
        </div>
      </div>
      <Switch>
        <Match when={characters.isLoading}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
          </div>
        </Match>
        <Match when={characters.error}>
          <FailedToFind />
        </Match>
        <Match when={characters.data}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <For each={characters.data}>
              {character => (
                <a
                  href={`/character/${character.nickname}`}
                  class="flex max-w-32 flex-col items-center">
                  <img
                    src={character.image}
                    alt={character.fullName}
                    class="max-w-full object-contain object-center"
                  />
                  <h2 class="max-w-32">{character.fullName}</h2>
                </a>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
