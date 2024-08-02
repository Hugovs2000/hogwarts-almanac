import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import { getCharacters, getHouses } from '../../services/api.service';
import HouseInfo from './components/HouseInfo';

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
        <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
          <p class="max-w-96">
            Apologies, we could not find the house you are looking for.
          </p>
        </div>
      </Match>
      <Match
        when={
          !(house.isLoading || houseCharacters.isLoading) &&
          house.data &&
          houseCharacters.data
        }>
        {house.data && (
          <HouseInfo
            house={house.data}
            houseCharacters={houseCharacters.data}
          />
        )}
      </Match>
    </Switch>
  );
}
