import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import { getBooks } from '../services/api.service';

export default function ViewBook() {
  const params = useParams();

  const query = createQuery(() => ({
    queryKey: ['getBook'],
    queryFn: () => getBooks(),
    select: books => {
      return books.find(book => book.number.toString() === params.id);
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
        Apologies, we could not find the book you are looking for.
      </Match>
      <Match when={query.data}>
        {query.data && (
          <div class="flex w-full flex-col items-center gap-2 p-6 text-center">
            <img
              src={query.data.cover}
              class="max-w-full object-contain object-center"
            />
            <h2 class="text-xl">{query.data.title}</h2>
            <div class="flex gap-4">
              <p>{query.data.releaseDate}</p>
              <p>{query.data.pages} pages</p>
            </div>
            <p class="max-w-96">{query.data.description}</p>
          </div>
        )}
      </Match>
    </Switch>
  );
}
