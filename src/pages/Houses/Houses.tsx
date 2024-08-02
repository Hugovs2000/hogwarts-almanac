import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import { getHouses } from '../../services/api.service';
import InfoCard from '../../shared/InfoCard';
import SectionBackground from '../../shared/SectionBackground';
import FailedToFind from '../Error/components/FailedToFind';

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
            <For each={houses.data}>{house => <InfoCard house={house} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
