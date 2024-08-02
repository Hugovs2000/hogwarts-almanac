import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';
import { getBooks } from '../../services/api.service';
import InfoCard from '../../shared/InfoCard';
import SectionBackground from '../../shared/SectionBackground';
import FailedToFind from '../Error/components/FailedToFind';

export default function Books() {
  const books = createQuery(() => ({
    queryKey: ['getBooks'],
    queryFn: () => getBooks(),
  }));

  const description =
    "The first Harry Potter book, Harry Potter and the Philosopher's Stone, was published by Bloomsbury in 1997 to immediate popular and critical acclaim. Six further best-selling books, three companion books, a playscript and two screenplays have since followed. The Harry Potter books have been translated into over 80 languages, won multiple awards, and sold more than 500 million copies worldwide, becoming the best-selling book series in history...";

  return (
    <>
      <SectionBackground title="Books" description={description} />
      <Switch>
        <Match when={books.isLoading}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
            <div class="skeleton h-48 w-32"></div>
          </div>
        </Match>
        <Match when={books.error}>
          <FailedToFind />
        </Match>
        <Match when={books.data}>
          <div class="m-4 flex flex-wrap justify-center gap-8 text-center">
            <For each={books.data}>{book => <InfoCard book={book} />}</For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
