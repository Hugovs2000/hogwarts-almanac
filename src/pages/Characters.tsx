import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import FailedToFind from '../components/FailedToFind';
import InfoCard from '../components/InfoCard';
import SectionBackground from '../components/SectionBackground';
import { getCharacters } from '../services/api.service';

export default function Characters() {
  const characters = createQuery(() => ({
    queryKey: ['getCharacters'],
    queryFn: () => getCharacters(),
  }));

  const description =
    'The Harry Potter series is renowned for its rich cast of characters, each contributing to the magical world created by J.K. Rowling. From the courageous trio of Harry Potter, Hermione Granger, and Ron Weasley to the enigmatic Dumbledore and the dark Lord Voldemort, each character brings unique depth and intrigue, captivating readers and viewers alike.';

  return (
    <>
      <SectionBackground title="Characters" description={description} />
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
              {character => <InfoCard character={character} />}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
