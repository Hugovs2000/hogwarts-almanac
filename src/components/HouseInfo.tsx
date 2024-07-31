import { For } from 'solid-js';
import { Characters } from '../models/characters';
import { House } from '../models/houses';

export default function HouseInfo({
  house,
  houseCharacters,
}: {
  house: House;
  houseCharacters?: Characters;
}) {
  return (
    <>
      {house && (
        <div class="flex flex-col items-center justify-center gap-4 p-6 text-center">
          <img
            src={`/images/${house.house}.png`}
            alt={house.house}
            class="max-w-96 object-contain object-center"
          />
          <div>
            <h1 class="text-2xl">{house.house}</h1>
            <h2 class="text-xl">Founder: {house.founder}</h2>
          </div>
          {houseCharacters && houseCharacters.length > 0 && (
            <>
              <h3 class="mt-2 text-lg">Members:</h3>
              <div class="flex flex-wrap justify-center gap-4">
                <For each={houseCharacters}>
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
            </>
          )}
        </div>
      )}
    </>
  );
}
