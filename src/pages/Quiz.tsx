import { createQuery } from '@tanstack/solid-query';
import { For, Show, createEffect, createSignal } from 'solid-js';
import QuestionCard from '../components/QuestionCard';
import { Spells } from '../models/spell';
import { getSpells } from '../services/api.service';

export default function Quiz() {
  const [spells, setSpells] = createSignal<Spells | null>(null);
  const [questions, setQuestions] = createSignal<Spells | null>(null);
  const [questionIndex, setQuestionIndex] = createSignal(0);

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
        const question =
          currentSpells[Math.floor(Math.random() * currentSpells.length)];
        if (!questions.includes(question)) {
          questions.push(question);
        }
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
      <For each={questions()}>
        {question => (
          <Show when={questionIndex() === questions()?.indexOf(question)}>
            <QuestionCard question={question} />
          </Show>
        )}
      </For>
      <Show when={questionIndex() <= 9}>
        <button onClick={() => setQuestionIndex(prev => prev + 1)}>
          Next Question
        </button>
      </Show>
    </div>
  );
}
