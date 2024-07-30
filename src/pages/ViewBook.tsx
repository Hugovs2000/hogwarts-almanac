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
      <Match when={query.isLoading}>Loading...</Match>
      <Match when={query.data === undefined || query.error}>
        Apologies, there was an error. Could not find the book you are looking
        for.
      </Match>
      <Match when={query.data}>
        {query.data && (
          <div class="flex w-full flex-col items-center gap-2 p-6">
            <img
              src={query.data.cover}
              class="max-w-full object-contain object-center"
            />
            <h2 class="text-xl">{query.data.title}</h2>
            <div class="flex gap-4">
              <p>{query.data.releaseDate}</p>
              <p>{query.data.pages} pages</p>
            </div>
            <p class="text-center">{query.data.description}</p>
          </div>
        )}
      </Match>
    </Switch>
  );
}
