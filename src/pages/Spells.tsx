import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import { getSpells } from '../services/api.service';

export default function Spells() {
  const spells = createQuery(() => ({
    queryKey: ['getSpells'],
    queryFn: () => getSpells(),
  }));

  return (
    <>
      <div class="relative">
        <img
          src="/images/books-bg.webp"
          class="h-72 w-full object-cover object-center md:h-96"
        />
        <div class="absolute top-4 h-96 w-full flex-col text-center sm:top-8 md:top-20">
          <h1 class="mx-auto w-fit text-center text-2xl">Spells</h1>
          <p class="mx-auto max-h-60 max-w-96 text-ellipsis">
            The Harry Potter series features a diverse array of spells that add
            wonder and complexity to the magical world. From the basic “Lumos”
            for light to powerful curses like “Avada Kedavra,” these
            incantations showcase the depth of wizarding magic. Each spell, with
            its unique effects and intricacies, plays a crucial role in the
            adventures and conflicts throughout the series.
          </p>
        </div>
      </div>
      <Switch>
        <Match when={spells.isLoading}>Loading...</Match>
        <Match when={spells.error}>There was an error</Match>
        <Match when={spells.data}>
          <div class="m-4 flex flex-col flex-nowrap items-center gap-8 text-center">
            <For each={spells.data}>
              {spell => (
                <div class="flex w-48 flex-col items-center rounded-lg bg-neutral p-4">
                  <h2 class="text-xl">{spell.spell}</h2>
                  <div class="divider m-0"></div>
                  <p>{spell.use}</p>
                </div>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
