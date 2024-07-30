import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
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
        {character.data && (
          <div class="flex w-full flex-col items-center gap-2 p-6 pt-8 text-center">
            <div class="relative">
              <img
                src={`/images/${character.data.hogwartsHouse}.png`}
                alt={character.data.hogwartsHouse}
                class="absolute -right-10 -top-5 max-w-20 object-contain object-center"
              />
              <img
                src={character.data.image}
                class="max-w-56 object-contain object-center"
              />
            </div>
            <div>
              <h1 class="text-2xl">{character.data.fullName}</h1>
              <span>Interpreted by: {character.data.interpretedBy}</span>
            </div>
            <div class="mt-2 flex flex-col">
              <p>Born: {character.data.birthdate}</p>
              <p>House: {character.data.hogwartsHouse}</p>
            </div>
            <div>
              {character.data.children.length > 0 && (
                <>
                  <h2 class="mt-2 text-xl">Children:</h2>
                  <ul>
                    {character.data.children.map(child => (
                      <li>{child}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </Match>
    </Switch>
  );
}
