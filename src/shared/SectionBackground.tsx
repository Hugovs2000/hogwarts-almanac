export default function SectionBackground({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div class="relative">
      <img
        src="/images/sectionBackground.webp"
        class="h-72 w-full object-cover object-center md:h-96"
      />
      <div class="absolute top-4 w-full flex-col p-4 text-center sm:top-8 md:top-20">
        <h1 class="mx-auto w-fit text-center text-2xl">{title}</h1>
        <p class="mx-auto line-clamp-[8] max-h-60 max-w-96 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
}
