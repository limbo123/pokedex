import { FC } from "react";
import styles from "./Card.module.css";
import typesColors from "../../сolorsOfTypes.json";
import { IPokemon } from "../../models/PokemonModel";
import { IPokemonInfo } from "../../models/CurrentPokemonInfoModel";

interface CardProps {
  pokemonInfo: IPokemon;
  setCurrentPokemon: (pokemon: IPokemonInfo) => void;
}

const Card: FC<CardProps> = ({ pokemonInfo, setCurrentPokemon }) => {

  const setPokemon = () => {
    const { stats, types, weight, moves, name, sprites } = pokemonInfo;

    const generalInfo: IPokemonInfo = {
      name,
      image: sprites.front_default,
      "Types": types.map((type) => type.type.name).join(", "),
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
            {pokemonInfo.types.map(({ type, slot }) => {
              return <li key={slot} style={{background: typesColors[type.name as keyof typeof typesColors]}}>{type?.name}</li>
            })}
          </ul>
        </div>
      </>
    );
  }
  return null;
};

export default Card;
