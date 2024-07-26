import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import {
  getBooks,
  getCharacters,
  getHouses,
  getSpells,
} from '../services/api.service';
export default function Home() {
  const books = createQuery(() => ({
    queryKey: ['getBooks'],
    queryFn: () => getBooks(),
  }));

  const characters = createQuery(() => ({
    queryKey: ['getCharacters'],
    queryFn: () => getCharacters(),
  }));

  const houses = createQuery(() => ({
    queryKey: ['getHouses'],
    queryFn: () => getHouses(),
  }));

  const spells = createQuery(() => ({
    queryKey: ['getSpells'],
    queryFn: () => getSpells(),
  }));

  return (
    <div class="flex flex-col bg-blue-400">
      <div class="relative z-0 w-full">
        <video
          autoplay
          muted
          loop
          playsinline
          src="https://cdn-hogwartslegacy.warnerbrosgames.com/home/hero.mp4?c=b"
          class="left-0 top-0"></video>
        <div class="absolute left-0 top-0 h-full w-full bg-black/20"></div>
      </div>
      <Switch>
        <Match when={spells.isPending}>Loading...</Match>
        <Match when={spells.error}>
          {'An error has occurred: ' + (spells.error as Error).message}
        </Match>
        <Match when={spells.data !== undefined}>
          <For each={spells.data}>{spell => <h1>{spell.spell}</h1>}</For>
        </Match>
      </Switch>
    </div>
  );
}
