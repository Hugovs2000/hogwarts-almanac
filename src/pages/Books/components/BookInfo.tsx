import { Book } from '../../../models/books';

export default function BookInfo({ book }: { book: Book }) {
  return (
    <div class="flex w-full flex-col items-center gap-2 p-6 text-center">
      <img src={book.cover} class="max-w-full object-contain object-center" />
      <h2 class="text-xl">{book.title}</h2>
      <div class="flex gap-4">
        <p>{book.releaseDate}</p>
        <p>{book.pages} pages</p>
      </div>
      <p class="max-w-96">{book.description}</p>
    </div>
  );
}
