import { Match, Switch } from 'solid-js';
import { Book } from '../models/books';
import { Character } from '../models/characters';
import { House } from '../models/houses';

export default function InfoCard({
  book,
  character,
  house,
}: {
  book?: Book;
  character?: Character;
  house?: House;
}) {
  return (
    <Switch>
      <Match when={book}>
        {book && (
          <a
            href={`/book/${book.number}`}
            class="flex max-w-32 cursor-pointer flex-col items-center">
            <img
              src={book.cover}
              class="h-52 w-32 max-w-full object-cover object-center"
            />
            <h2>{book.title}</h2>
          </a>
        )}
      </Match>
      <Match when={character}>
        {character && (
          <a
            href={`/character/${character.nickname}`}
            class="flex w-32 flex-col items-center">
            <img
              src={character.image}
              alt={character.fullName}
              class="min-h-48 w-32 object-contain object-center"
            />
            <h2 class="w-32">{character.fullName}</h2>
          </a>
        )}
      </Match>
      <Match when={house}>
        {house && (
          <a
            href={`/house/${house.house}`}
            class="flex max-w-44 flex-col items-center">
            <img
              src={`/images/${house.house}.png`}
              alt={house.house}
              class="max-w-full object-contain object-center"
            />
            <h2 class="text-xl">{house.house}</h2>
            <h3>Founder: {house.founder}</h3>
          </a>
        )}
      </Match>
    </Switch>
  );
}
