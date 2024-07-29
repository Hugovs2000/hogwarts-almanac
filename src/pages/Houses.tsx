import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import { getHouses } from '../services/api.service';

export default function Houses() {
  const houses = createQuery(() => ({
    queryKey: ['getHouses'],
    queryFn: () => getHouses(),
  }));

  return (
    <>
      <div class="relative">
        <img
          src="/src/assets/images/books-bg.webp"
          class="h-72 w-full object-cover object-center md:h-96"
        />
        <div class="absolute top-4 h-96 w-full flex-col text-center sm:top-8 md:top-20">
          <h1 class="mx-auto w-fit text-center text-2xl">Houses</h1>
          <p class="mx-auto max-h-60 max-w-96 text-ellipsis">
            Hogwarts School of Witchcraft and Wizardry is divided into four
            Houses: Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. These
            Houses embody unique traits: Gryffindor values bravery, Hufflepuff
            emphasizes loyalty, Ravenclaw prizes intelligence, and Slytherin
            cherishes ambition. The Sorting Hat assigns new students to their
            Houses, shaping their Hogwarts experience.
          </p>
        </div>
      </div>
      <Switch>
        <Match when={houses.isLoading}>Loading...</Match>
        <Match when={houses.error}>There was an error</Match>
        <Match when={houses.data}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <For each={houses.data}>
              {house => (
                <div class="flex max-w-32 cursor-pointer flex-col items-center">
                  <Switch>
                    <Match when={house.house === 'Gryffindor'}>
                      <img
                        src="/src/assets/images/gryff-logo.png"
                        alt="Gryffindor"
                        class="max-w-full object-contain object-center"
                      />
                    </Match>
                    <Match when={house.house === 'Hufflepuff'}>
                      <img
                        src="/src/assets/images/huff-logo.png"
                        alt="Gryffindor"
                        class="max-w-full object-contain object-center"
                      />
                    </Match>
                    <Match when={house.house === 'Ravenclaw'}>
                      <img
                        src="/src/assets/images/rave-logo.png"
                        alt="Gryffindor"
                        class="max-w-full object-contain object-center"
                      />
                    </Match>
                    <Match when={house.house === 'Slytherin'}>
                      <img
                        src="/src/assets/images/slyth-logo.png"
                        alt="Gryffindor"
                        class="max-w-full object-contain object-center"
                      />
                    </Match>
                  </Switch>
                  <h2>{house.house}</h2>
                </div>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
