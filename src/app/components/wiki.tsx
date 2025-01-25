import "../ui/wiki.css";

interface WikiProps {
  kingdom: string;
  img: string;
  capital: string;
  climate: string;
  demographics: string;
}

export default function Wiki(props: WikiProps) {
  return (
    <div>
      <h1>{props.kingdom}</h1>
        <table>
          <tbody>
            <tr>
              <td colSpan={ 2 }><img className="wikiHero" src={props.img} alt={props.kingdom} /></td>
            </tr>
            <tr>
              <td>Capital:</td>
              <td>{props.capital}</td>
            </tr>
            <tr>
              <td>Climate:</td>
              <td>{props.climate}</td>
            </tr>
            <tr>
              <td>Demographics:</td>
              <td>{props.demographics}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}