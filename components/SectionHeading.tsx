export default function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="display-type mb-14 text-[clamp(2.6rem,7.5vw,6.5rem)] text-bone md:mb-20">
      {title}
    </h2>
  );
}
