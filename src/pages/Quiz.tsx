import { createQuery } from '@tanstack/solid-query';
import { For, Show, createEffect, createSignal } from 'solid-js';
import QuestionCard from '../components/QuestionCard';
import { Spells } from '../models/spell';
import { getSpells } from '../services/api.service';

export default function Quiz() {
  const [spells, setSpells] = createSignal<Spells | null>(null);
  const [questions, setQuestions] = createSignal<Spells | null>(null);
  const [questionIndex, setQuestionIndex] = createSignal(0);
  const [score, setScore] = createSignal(0);

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
      let counter = 0;
      while (questions.length < 10) {
        const question =
          currentSpells[Math.floor(Math.random() * currentSpells.length)];
        if (!questions.includes(question)) {
          questions.push(question);
        }
        counter++;
      }
      setQuestions(questions);
    }

    return () => {
      setSpells(null);
      setQuestions(null);
    };
  });

  return (
    <div class="flex w-full flex-col items-center gap-4 p-6 sm:mx-auto sm:w-fit">
      <h1 class="text-3xl font-bold">Spells Quiz</h1>
      <For each={questions()}>
        {(question, index) => (
          <Show when={questionIndex() === questions()?.indexOf(question)}>
            <QuestionCard
              question={question}
              questionNumber={index() + 1} // Convert index to a number
              setQuestionIndex={setQuestionIndex}
              setScore={setScore}
            />
          </Show>
        )}
      </For>
      <Show when={questionIndex() < (questions()?.length ?? 0)}>
        <h2 class="self-start text-xl font-semibold">Score: {score()}</h2>
      </Show>
      <Show when={questionIndex() === questions()?.length}>
        <h2 class="text-xl font-semibold">Quiz complete!</h2>
        <h3 class="text-lg">Your score: {score()}</h3>
        <button
          class="btn"
          onClick={() => {
            setQuestionIndex(0);
            setScore(0);
          }}>
          Restart this quiz
        </button>
        <button onClick={() => location.reload()} class="btn">
          Take a new quiz
        </button>
      </Show>
    </div>
  );
}
