import { useEffect, useState } from "react";
import { PokemonService } from "./api/pokemonService";
import Card from "./components/Card/Card";
import CurrentPokemonCard from "./components/CurrentPokemonCard/CurrentPokemonCard";
import { IResultsData } from "./models/ResultsData";
import styles from "./styles/App.module.css";
import { Oval } from "react-loader-spinner";
import { FiChevronUp } from "@react-icons/all-files/fi/FiChevronUp";
import TypesFilter from "./components/TypesFilter/TypesFilter";

function App() {
  const [pokemons, setPokemons] = useState<IResultsData[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<IResultsData[]>([])
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [nextRequestUrl, setNextRequestUrl] = useState<string | null>(
    "/pokemon/?limit=12"
  );
  const [typesFilter, setTypesFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setIsLoading(true);
    const res = await PokemonService.getAllPokemons(nextRequestUrl as string);
    console.log(res);
    setPokemons((prev) => [...prev, ...res.results]);
    setNextRequestUrl(res.next);
    setIsLoading(false);
  };

  useEffect(() => {
    setDisplayedPokemons(pokemons);
  }, [pokemons])

  useEffect(() => {
    if(typesFilter.length === 0) {
      setDisplayedPokemons(pokemons);
      return;
    };
    const filteredPokemons = pokemons.filter((pokemon: any) => {
      return pokemon.types.some((type: any) => {
        // console.log(type.type.name);
        // console.log(typesFilter.includes(type.type.name));
        return typesFilter.includes(type.type.name);
      })
    });
    setDisplayedPokemons(filteredPokemons);
  }, [typesFilter, pokemons]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    <TypesFilter typesFilter={typesFilter} setTypeFilters={setTypesFilter}/>
      <div className={styles.container}>
        {displayedPokemons.map((pokemon) => {
          return (
            <Card
              key={pokemon.name}
              pokemonInfo={pokemon}
              setCurrentPokemon={setCurrentPokemon}
            />
          );
        })}
      </div>
      <button
        type="button"
        className={styles.loadMoreBtn}
        onClick={fetchPokemons}
      >
        {isLoading ? <Oval color="#fff" height={30} width={30} /> : "Load More"}
      </button>
      <CurrentPokemonCard pokemonInfo={currentPokemon} />

      <button
        type="button"
        className={styles.scrollToTopBtn}
        onClick={scrollToTop}
      >
        <FiChevronUp />
      </button>
    </>
  );
}

export default App;
