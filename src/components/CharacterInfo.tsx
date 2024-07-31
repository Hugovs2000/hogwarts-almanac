import { Character } from '../models/characters';

export default function CharacterInfo({ character }: { character: Character }) {
  return (
    <div class="flex w-full flex-col items-center gap-2 p-6 pt-8 text-center">
      <div class="relative">
        <img
          src={`/images/${character.hogwartsHouse}.png`}
          alt={character.hogwartsHouse}
          class="absolute -right-10 -top-5 max-w-20 object-contain object-center"
        />
        <img
          src={character.image}
          class="max-w-56 object-contain object-center"
        />
      </div>
      <div>
        <h1 class="text-2xl">{character.fullName}</h1>
        <span>Interpreted by: {character.interpretedBy}</span>
      </div>
      <div class="mt-2 flex flex-col">
        <p>Born: {character.birthdate}</p>
        <p>House: {character.hogwartsHouse}</p>
      </div>
      <div>
        {character.children.length > 0 && (
          <>
            <h2 class="mt-2 text-xl">Children:</h2>
            <ul>
              {character.children.map(child => (
                <li>{child}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
