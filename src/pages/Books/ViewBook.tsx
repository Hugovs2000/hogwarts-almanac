import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch } from 'solid-js';
import { getBooks } from '../../services/api.service';
import BookInfo from './components/BookInfo';

export default function ViewBook() {
  const params = useParams();

  const book = createQuery(() => ({
    queryKey: ['getBook'],
    queryFn: () => getBooks(),
    select: books => {
      return books.find(book => book.number.toString() === params.id);
    },
  }));

  return (
    <Switch>
      <Match when={book.isLoading}>
        <div class="flex w-full flex-col items-center gap-4 p-6">
          <div class="skeleton h-96 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
          <div class="skeleton h-10 w-80"></div>
        </div>
      </Match>
      <Match when={book.data === undefined || book.error}>
        <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
          <p class="max-w-96">
            Apologies, we could not find the book you are looking for.
          </p>
        </div>
      </Match>
      <Match when={book.data}>
        {book.data && <BookInfo book={book.data} />}
      </Match>
    </Switch>
  );
}
