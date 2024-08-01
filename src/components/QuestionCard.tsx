import { createForm } from '@tanstack/solid-form';
import { createQuery } from '@tanstack/solid-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { For, Setter, createSignal } from 'solid-js';
import { z } from 'zod';
import { Spell } from '../models/spell';
import { getSpells } from '../services/api.service';

export default function QuestionCard({
  question,
  questionNumber,
  setQuestionIndex,
  setScore,
}: {
  question: Spell;
  questionNumber: number;
  setQuestionIndex: Setter<number>;
  setScore: Setter<number>;
}) {
  const [randomSpellNames, setRandomSpellNames] = createSignal<string[] | null>(
    null
  );

  const form = createForm(() => ({
    validatorAdapter: zodValidator(),
    defaultValues: {
      selectedSpell: '',
    },
    onSubmit: async ({ value }) => {
      if (value.selectedSpell === question.spell) {
        setScore(prev => prev + 1);
        setQuestionIndex(prev => prev + 1);
      } else {
        setQuestionIndex(prev => prev + 1);
      }
    },
  }));

  createQuery(() => ({
    queryKey: ['getRandomSpellNames'],
    queryFn: () => getSpells(),
    select: spells => {
      const randomSpells: string[] = [];
      if (spells) {
        randomSpells.push(question.spell);
        let counter = 0;
        while (randomSpells.length < 4) {
          const randomSpell =
            spells[Math.floor(Math.random() * spells.length)].spell;
          if (
            randomSpell !== question.spell &&
            !randomSpells.includes(randomSpell)
          ) {
            randomSpells.push(randomSpell);
          }
          counter++;
        }
        setRandomSpellNames(shuffle(randomSpells));
      }
    },
  }));

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div class="flex min-h-64 w-full flex-col items-center gap-2 rounded-lg bg-neutral p-6 sm:w-96">
      <h2 class="self-start text-xl">
        {questionNumber}. {question.use}
      </h2>
      <div class="divider m-0"></div>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        class="w-full">
        <form.Field
          name="selectedSpell"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(1),
          }}
          children={field => (
            <div class="min-h-24 self-start pl-4">
              <For each={randomSpellNames()}>
                {spell => (
                  <div>
                    <input
                      type="radio"
                      name={field().name}
                      id={spell}
                      value={spell}
                      onChange={() => field().setValue(spell)}
                      class="mr-2"
                    />
                    <label for={spell}>{spell}</label>
                  </div>
                )}
              </For>
            </div>
          )}
        />
        <button type="submit" class="mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
