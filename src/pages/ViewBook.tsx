import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { Show, Suspense, createSignal } from 'solid-js';
import { Book } from '../models/books';
import { getBooks } from '../services/api.service';

export default function ViewBook() {
  const params = useParams();
  const [selectedBook, setSelectedBook] = createSignal<Book | null>(null);

  const query = createQuery(() => ({
    queryKey: ['getBook'],
    queryFn: () => getBooks(),
    select: books => {
      const book = books.find(book => book.number.toString() === params.id);
      if (book) {
        setSelectedBook(book);
      }
    },
  }));

  return (
    <Suspense>
      <Show when={query.isPending}>Loading...</Show>
      <Show when={!query.isPending && !selectedBook()}>No book was found</Show>
      <Show when={selectedBook()}>
        <div class="flex w-full flex-col items-center gap-2 p-6">
          <img
            src={selectedBook()?.cover}
            class="max-w-full object-contain object-center"
          />
          <h2 class="text-xl">{selectedBook()?.title}</h2>
          <div class="flex gap-4">
            <p>{selectedBook()?.releaseDate}</p>
            <p>{selectedBook()?.pages} pages</p>
          </div>
          <p class="text-center">{selectedBook()?.description}</p>
        </div>
      </Show>
    </Suspense>
  );
}
