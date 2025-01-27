import Wiki from '../../components/wiki';

export default function Page() {
  return (
    <div>
      <Wiki
        kingdom="Kingdom of Thetbia"
        img="/images/wikiimages/thetbia.jpg"
        capital="Manch"
        climate="Arid desert with extreme temperatures and little rainfall."
        demographics="Primarily humans adapted to the harsh conditions. Known for their nomadic lifestyle and expertise in navigating the desert. Thetbia is a source of rare desert herbs and minerals."
      />
    </div>
  );
}