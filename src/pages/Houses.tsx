import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import FailedToFind from '../components/FailedToFind';
import SectionBackground from '../components/SectionBackground';
import { getHouses } from '../services/api.service';

export default function Houses() {
  const houses = createQuery(() => ({
    queryKey: ['getHouses'],
    queryFn: () => getHouses(),
  }));

  const description =
    'Hogwarts School of Witchcraft and Wizardry is divided into four Houses: Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. These Houses embody unique traits: Gryffindor values bravery, Hufflepuff emphasizes loyalty, Ravenclaw prizes intelligence, and Slytherin cherishes ambition. The Sorting Hat assigns new students to their Houses, shaping their Hogwarts experience.';

  return (
    <>
      <SectionBackground title="Houses" description={description} />
      <Switch>
        <Match when={houses.isLoading}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <div class="skeleton h-32 w-48"></div>
            <div class="skeleton h-32 w-48"></div>
            <div class="skeleton h-32 w-48"></div>
            <div class="skeleton h-32 w-48"></div>
          </div>
        </Match>
        <Match when={houses.error}>
          <FailedToFind />
        </Match>
        <Match when={houses.data}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <For each={houses.data}>
              {house => (
                <a
                  href={`/house/${house.house}`}
                  class="flex max-w-44 flex-col items-center">
                  <img
                    src={`/images/${house.house}.png`}
                    alt={house.house}
                    class="max-w-full object-contain object-center"
                  />
                  <h2 class="text-xl">{house.house}</h2>
                  <h3>Founder: {house.founder}</h3>
                </a>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
