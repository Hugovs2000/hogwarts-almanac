import { createQuery } from '@tanstack/solid-query';
import { For, createSignal } from 'solid-js';
import { Spell } from '../models/spell';
import { getSpells } from '../services/api.service';

export default function QuestionCard({ question }: { question: Spell }) {
  const [randomSpellNames, setRandomSpellNames] = createSignal<string[] | null>(
    null
  );

  createQuery(() => ({
    queryKey: ['getRandomSpellNames'],
    queryFn: () => getSpells(),
    select: spells => {
      const randomSpells: string[] = [];
      if (spells) {
        for (let i = 0; i < 3; i++) {
          if (spells[i].spell !== question.spell) {
            randomSpells.push(
              spells[Math.floor(Math.random() * spells.length)].spell
            );
          }
        }
        setRandomSpellNames(randomSpells);
      }
    },
  }));

  return (
    <div class="flex w-full flex-col items-center gap-2 rounded-lg bg-neutral p-6 sm:w-96">
      <h2 class="text-xl">{question.use}</h2>
      <div class="divider m-0"></div>
      <div class="w-full self-start pl-4">
        <input
          type="radio"
          id={question.spell}
          value={question.spell}
          class="mr-2"
        />
        <label for={question.spell}>{question.spell}</label>
        <For each={randomSpellNames()}>
          {spell => (
            <div>
              <input type="radio" id={spell} value={spell} class="mr-2" />
              <label for={spell}>{spell}</label>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
