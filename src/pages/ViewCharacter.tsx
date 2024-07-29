import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Show, Suspense, createSignal } from 'solid-js';
import { Character } from '../models/characters';
import { getCharacters } from '../services/api.service';

export default function ViewCharacter() {
  const params = useParams();
  const [selectedCharacter, setSelectedCharacter] =
    createSignal<Character | null>(null);

  const query = createQuery(() => ({
    queryKey: ['getCharacter'],
    queryFn: () => getCharacters(),
    select: characters => {
      const character = characters.find(
        character => character.nickname.toString() === params.name
      );
      if (character) {
        setSelectedCharacter(character);
      }
    },
  }));

  return (
    <Suspense>
      <Show when={query.isPending}>Loading...</Show>
      <Show when={!query.isPending && !selectedCharacter()}>
        No character was found
      </Show>
      <Show when={selectedCharacter()}>
        <div class="flex w-full flex-col items-center gap-2 p-6">
          <img
            src={selectedCharacter()?.image}
            class="max-w-full object-contain object-center"
          />
          <h2 class="text-xl">{selectedCharacter()?.fullName}</h2>
          <div class="flex gap-4">
            <p>{selectedCharacter()?.birthdate}</p>
            <p>{selectedCharacter()?.hogwartsHouse}</p>
          </div>
        </div>
      </Show>
    </Suspense>
  );
}
