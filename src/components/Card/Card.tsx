import React, { FC, useEffect, useState } from "react";
import { PokemonService } from "../../api/pokemonService";
import styles from "./Card.module.css";

interface CardProps {
  pokemonInfo: any; // REMOVE ANY!!!
  setCurrentPokemon: (pokemon: any) => void;  // REMOVE ANY!!!
}

const Card: FC<CardProps> = ({ pokemonInfo, setCurrentPokemon }) => {

  const setPokemon = () => {
    const { stats, types, weight, moves, name, sprites } = pokemonInfo;

    const generalInfo = {
      name,
      image: sprites.front_default,
      "Types": types.map((type: any) => type.type.name).join(", "),
      "Attack": stats[1].base_stat,
      "Defence": stats[2].base_stat,
      "HP": stats[0].base_stat,
      "SP Attack": stats[3].base_stat,
      "SP Defence": stats[4].base_stat,
      "Speed": stats[5].base_stat,
      "Weight": weight,
      "Total moves": moves.length,
    }

    setCurrentPokemon(generalInfo);
  }

  if(Object.keys(pokemonInfo).length > 0) {
    return (
      <>
        <div className={styles.card} onClick={setPokemon}>
        <img src={pokemonInfo.sprites.front_default} alt="" />
  
        <h1>{pokemonInfo.name}</h1>
          
          <ul className={styles.typesList}>
            {pokemonInfo.types.map((type: any) => {
              return <li key={type.slot}>{type?.type?.name}</li>
            })}
          </ul>
        </div>
      </>
    );
  }
  return null;
};

export default Card;
