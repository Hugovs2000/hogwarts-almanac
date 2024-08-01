import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import FailedToFind from '../components/FailedToFind';
import SectionBackground from '../components/SectionBackground';
import { getSpells } from '../services/api.service';

export default function Spells() {
  const spells = createQuery(() => ({
    queryKey: ['getSpells'],
    queryFn: () => getSpells(),
  }));

  const description =
    'The Harry Potter series features a diverse array of spells that add wonder and complexity to the magical world. From the basic “Lumos” for light to powerful curses like “Avada Kedavra,” these incantations showcase the depth of wizarding magic. Each spell, with its unique effects and intricacies, plays a crucial role in the adventures and conflicts throughout the series.';

  return (
    <>
      <SectionBackground title="Spells" description={description} />
      <p class="p-4 text-center">
        Test your knowledge with the{' '}
        <a href="/quiz" class="link">
          Spells Quiz
        </a>
      </p>
      <Switch>
        <Match when={spells.isLoading}>
          <div class="m-4 flex flex-col flex-nowrap items-center gap-8 text-center">
            <div class="skeleton h-32 w-48"></div>
            <div class="skeleton h-32 w-48"></div>
            <div class="skeleton h-32 w-48"></div>
          </div>
        </Match>
        <Match when={spells.error}>
          <FailedToFind />
        </Match>
        <Match when={spells.data}>
          <div class="m-4 flex flex-col flex-nowrap items-center gap-8 text-center">
            <For each={spells.data}>
              {spell => (
                <div class="flex w-56 flex-col items-center rounded-lg bg-neutral p-4 sm:w-64 md:w-72">
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
