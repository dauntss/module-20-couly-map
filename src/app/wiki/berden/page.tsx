import Wiki from '../../components/wiki';

export default function Page() {
  return (
    <div>
      <Wiki
        kingdom="Kingdom of Berden"
        img="/images/wikiimages/berden.jpg"
        capital="Chipledon"
        climate="Temperate with fertile plains and dense forests. Experiences all four seasons distinctly."
        demographics="Mostly humans with a growing population of half-elves. Berden is known for its agriculture, livestock, and skilled archers."
      />
    </div>
  );
}