import "../ui/wiki.css";

interface SitesProps {
  sitename: string;
  img: string;
  significance: string;
}

export default function SitesWiki(props: SitesProps) {
  return (
    <div>
      <h1>{props.sitename}</h1>
        <table>
          <tbody>
            <tr>
              <td colSpan={ 2 }><img className="wikiHero" src={props.img} alt={props.sitename} /></td>
            </tr>
            <tr>
              <td>Significance:</td>
              <td>{props.significance}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}