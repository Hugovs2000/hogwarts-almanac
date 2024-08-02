import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { For, Setter, createSignal } from 'solid-js';
import { z } from 'zod';
import { Spell, Spells } from '../../../models/spell';
import shuffle from '../../../utils/shuffle';

export default function QuestionCard({
  question,
  spells,
  questionNumber,
  setQuestionIndex,
  setScore,
}: {
  question: Spell;
  spells: Spells;
  questionNumber: number;
  setQuestionIndex: Setter<number>;
  setScore: Setter<number>;
}) {
  const [randomSpellNames, setRandomSpellNames] = createSignal<string[]>([]);
  const randomSpells: string[] = [];

  if (spells?.length > 0) {
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

  return (
    <div class="flex min-h-72 w-full flex-col items-center gap-2 rounded-lg bg-neutral p-6 sm:w-96">
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
        class="h-full w-full">
        <form.Field
          name="selectedSpell"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(1),
          }}
          children={field => (
            <div class="flex min-h-32 flex-col gap-2 self-start sm:pl-4">
              <For each={randomSpellNames()}>
                {spell => (
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      name={field().name}
                      id={spell}
                      value={spell}
                      onChange={() => field().setValue(spell)}
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
