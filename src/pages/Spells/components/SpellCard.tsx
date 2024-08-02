import { Spell } from '../../../models/spell';

export default function SpellCard({ spell }: { spell: Spell }) {
  return (
    <div class="flex w-56 flex-col items-center rounded-lg bg-neutral p-4 sm:w-64 md:w-72">
      <h2 class="text-xl">{spell.spell}</h2>
      <div class="divider m-0"></div>
      <p>{spell.use}</p>
    </div>
  );
}
