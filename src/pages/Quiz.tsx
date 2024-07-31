import { createQuery } from '@tanstack/solid-query';
import { For, createEffect, createSignal } from 'solid-js';
import QuestionCard from '../components/QuestionCard';
import { Spells } from '../models/spell';
import { getSpells } from '../services/api.service';

export default function Quiz() {
  const [spells, setSpells] = createSignal<Spells | null>(null);
  const [questions, setQuestions] = createSignal<Spells | null>(null);

  createQuery(() => ({
    queryKey: ['getSpells'],
    queryFn: () => getSpells(),
    select: data => {
      if (!data) {
        return null;
      }
      setSpells(data);
    },
  }));

  createEffect(() => {
    const currentSpells = spells();
    const questions: Spells = [];
    if (currentSpells && currentSpells.length > 0 && questions.length === 0) {
      for (let i = 0; i < 10; i++) {
        questions.push(
          currentSpells[Math.floor(Math.random() * currentSpells.length)]
        );
      }
      setQuestions(questions);
    }

    return () => {
      setSpells(null);
      setQuestions(null);
    };
  });

  return (
    <div class="flex flex-col items-center gap-4 p-6">
      {questions() && (
        <For each={questions()}>
          {question => <QuestionCard question={question} />}
        </For>
      )}
    </div>
  );
}
