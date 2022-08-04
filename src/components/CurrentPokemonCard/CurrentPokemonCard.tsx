import React, { FC, useEffect } from "react";
import styles from "./CurrentPokemonCard.module.css";

interface CurrentPokemonCardProps {
  pokemonInfo: any; //REMOVE ANY
}

const CurrentPokemonCard: FC<CurrentPokemonCardProps> = ({ pokemonInfo }) => {

  if (Object.keys(pokemonInfo).length > 0) {
    return (
        <div className={styles.card}>
          <img src={pokemonInfo.image} alt="" />

          <h1>{pokemonInfo.name}</h1>
          <table>
            <>
              {Object.entries(pokemonInfo).map(([key, value]: any) => {
                if(key === "name" || key === "image") return null;
                return <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
              })}
            </>
          </table>
        </div>
    );
  }
  return null;
};

export default CurrentPokemonCard;
