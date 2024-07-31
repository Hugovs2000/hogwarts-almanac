import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import CharacterInfo from '../components/CharacterInfo';
import { getCharacters } from '../services/api.service';

export default function ViewCharacter() {
  const params = useParams();

  const character = createQuery(() => ({
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
      <Match when={character.isLoading}>
        <div class="flex w-full flex-col items-center gap-4 p-6">
          <div class="skeleton h-96 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
        </div>
      </Match>
      <Match when={character.data === undefined || character.error}>
        <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
          <p class="max-w-96">
            Apologies, we could not find the character you are looking for.
          </p>
        </div>
      </Match>
      <Match when={character.data}>
        {character.data && <CharacterInfo character={character.data} />}
      </Match>
    </Switch>
  );
}
