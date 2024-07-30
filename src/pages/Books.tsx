import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import { getBooks } from '../services/api.service';

export default function Books() {
  const books = createQuery(() => ({
    queryKey: ['getBooks'],
    queryFn: () => getBooks(),
  }));

  return (
    <>
      <div class="relative">
        <img
          src="/images/books-bg.webp"
          class="h-72 w-full object-cover object-center md:h-96"
        />
        <div class="absolute top-4 h-96 w-full flex-col text-center sm:top-8 md:top-20">
          <h1 class="mx-auto w-fit text-center text-2xl">Books</h1>
          <p class="mx-auto max-w-96">
            The first Harry Potter book, Harry Potter and the Philosopher’s
            Stone, was published by Bloomsbury in 1997 to immediate popular and
            critical acclaim. Six further best-selling books, three companion
            books, a playscript and two screenplays have since followed. The
            Harry Potter books have been translated into over 80 languages, won
            multiple awards, and sold more than 500 million copies worldwide,
            becoming the best-selling book series in history...
          </p>
        </div>
      </div>
      <Switch>
        <Match when={books.isLoading}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
          </div>
        </Match>
        <Match when={books.error}>There was an error</Match>
        <Match when={books.data}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <For each={books.data}>
              {book => (
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
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
