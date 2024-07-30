import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import { getCharacters } from '../services/api.service';

export default function ViewCharacter() {
  const params = useParams();

  const query = createQuery(() => ({
    queryKey: ['getCharacter'],
    queryFn: () => getCharacters(),
    select: characters => {
      return characters.find(
        character => character.nickname.toString() === params.name
      );
    },
  }));

  return (
    <Switch>
      <Match when={query.isLoading}>
        <div class="flex w-full flex-col items-center gap-4 p-6">
          <div class="skeleton h-96 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
        </div>
      </Match>
      <Match when={query.data === undefined || query.error}>
        Apologies, there was an error. Could not find the character you are
        looking for.
      </Match>
      <Match when={query.data}>
        {query.data && (
          <div class="flex w-full flex-col items-center gap-2 p-6">
            <img
              src={query.data.image}
              class="max-w-full object-contain object-center"
            />
            <h2 class="text-xl">{query.data.fullName}</h2>
            <div class="flex gap-4">
              <p>{query.data.birthdate}</p>
              <p>{query.data.hogwartsHouse}</p>
            </div>
          </div>
        )}
      </Match>
    </Switch>
  );
}
