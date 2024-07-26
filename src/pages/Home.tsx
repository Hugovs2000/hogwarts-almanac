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
    <div class='bg-blue-500'>
      <h1>Home</h1>
      <Switch>
        <Match when={spells.isPending}>Loading...</Match>
        <Match when={spells.error}>
          {'An error has occurred: ' + (spells.error as Error).message}
        </Match>
        <Match when={spells.data !== undefined}>
          <For each={spells.data}>{(spell) => <h1>{spell.spell}</h1>}</For>
        </Match>
      </Switch>
    </div>
  );
}
