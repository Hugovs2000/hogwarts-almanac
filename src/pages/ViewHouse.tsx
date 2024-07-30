import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import FailedToFind from '../components/FailedToFind';
import { getCharacters, getHouses } from '../services/api.service';

export default function ViewHouse() {
  const params = useParams();

  const house = createQuery(() => ({
    queryKey: ['getHouse'],
    queryFn: () => getHouses(),
    select: houses => {
      return houses.find(house => house.house === params.house);
    },
  }));

  const houseCharacters = createQuery(() => ({
    queryKey: ['getHouseCharacters'],
    queryFn: () => getCharacters(),
    enabled: !!house.data?.house,
    select: characters => {
      return characters.filter(
        character => character.hogwartsHouse === params.house
      );
    },
  }));

  return (
    <Switch>
      <Match when={house.isLoading || houseCharacters.isLoading}>
        <div class="flex w-full flex-col items-center gap-4 p-6">
          <div class="skeleton h-96 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
        </div>
      </Match>
      <Match
        when={
          house.data === undefined ||
          house.error ||
          houseCharacters.data === undefined ||
          houseCharacters.error
        }>
        <FailedToFind />
      </Match>
      <Match
        when={
          !(house.isLoading || houseCharacters.isLoading) &&
          house.data &&
          houseCharacters.data
        }>
        {house.data && houseCharacters.data && (
          <div class="flex flex-col items-center justify-center gap-4 p-6 text-center">
            <img
              src={`/images/${house.data.house}.png`}
              alt={house.data.house}
              class="max-w-96 object-contain object-center"
            />
            <div>
              <h1 class="text-2xl">{house.data.house}</h1>
              <h2 class="text-xl">Founder: {house.data.founder}</h2>
            </div>
            <h3 class="mt-2 text-lg">Members:</h3>
            <div class="flex flex-wrap justify-center gap-4">
              <For each={houseCharacters.data}>
                {character => (
                  <a
                    href={`/character/${character.nickname}`}
                    class="flex flex-col gap-1">
                    <img
                      src={character.image}
                      alt="Character"
                      class="h-52 w-32 object-cover object-center"
                    />
                    <span class="max-w-32">{character.fullName}</span>
                  </a>
                )}
              </For>
            </div>
          </div>
        )}
      </Match>
    </Switch>
  );
}
