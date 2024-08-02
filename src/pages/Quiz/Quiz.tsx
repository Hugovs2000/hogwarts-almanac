import { createQuery } from '@tanstack/solid-query';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { Spells } from '../../models/spell';
import { getSpells } from '../../services/api.service';
import QuestionCard from './components/QuestionCard';

export default function Quiz() {
  const [spells, setSpells] = createSignal<Spells>([]);
  const [questions, setQuestions] = createSignal<Spells>([]);
  const [questionIndex, setQuestionIndex] = createSignal(0);
  const [score, setScore] = createSignal(0);

  const getSpell = createQuery(() => ({
    queryKey: ['getSpells'],
    queryFn: () => getSpells(),
    select: spells => {
      if (spells) {
        setSpells(spells);
      }
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
      setSpells([]);
      setQuestions([]);
    };
  });

  return (
    <div class="flex w-full flex-col items-center gap-4 p-6 sm:mx-auto sm:w-fit">
      <h1 class="text-3xl font-bold">Spells Quiz</h1>
      <Show when={getSpell.isLoading}>
        <div class="skeleton h-72 w-full rounded-lg sm:w-96"></div>
      </Show>
      <For each={questions()}>
        {(question, index) => (
          <>
            <Show
              when={
                !getSpell.isLoading &&
                questionIndex() === questions()?.indexOf(question)
              }>
              <QuestionCard
                question={question}
                spells={spells() ?? []}
                questionNumber={index() + 1}
                setQuestionIndex={setQuestionIndex}
                setScore={setScore}
              />
            </Show>
          </>
        )}
      </For>
      <Show when={questionIndex() < (questions()?.length ?? 0)}>
        <h2 class="self-start text-xl font-semibold">Score: {score()}</h2>
      </Show>
      <Show
        when={
          questions().length > 0 && questionIndex() === questions()?.length
        }>
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
