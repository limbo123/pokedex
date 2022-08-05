import { FC } from "react";
import { IPokemonInfo } from "../../models/CurrentPokemonInfoModel";
import styles from "./CurrentPokemonCard.module.css";

interface CurrentPokemonCardProps {
  pokemonInfo: IPokemonInfo;
}

const CurrentPokemonCard: FC<CurrentPokemonCardProps> = ({ pokemonInfo }) => {

  if (Object.keys(pokemonInfo).length > 0) {
    return (
        <div className={styles.card}>
          <img src={pokemonInfo.image} alt="" />

          <h1>{pokemonInfo.name}</h1>
          <table>
            <tbody>
            <>
              {Object.entries(pokemonInfo).map(([key, value]: any) => {
                if(key === "name" || key === "image") return null;
                //rendering table row for each pokemonInfo entry
                return <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
              })}
            </>
            </tbody>
          </table>
        </div>
    );
  }
  return null;
};

export default CurrentPokemonCard;
