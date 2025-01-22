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
      <img className="wikiHero" src={props.img} alt={props.kingdom} />
        <table>
          <tbody>
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