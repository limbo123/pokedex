import { useEffect, useState } from "react";
import { PokemonService } from "./api/pokemonService";
import Card from "./components/Card/Card";
import CurrentPokemonCard from "./components/CurrentPokemonCard/CurrentPokemonCard";
import styles from "./styles/App.module.css";
import { Oval } from "react-loader-spinner";
import { FiChevronUp } from "@react-icons/all-files/fi/FiChevronUp";
import TypesFilter from "./components/TypesFilter/TypesFilter";
import { IPokemon } from "./models/PokemonModel";
import { IPokemonInfo } from "./models/CurrentPokemonInfoModel";

function App() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]); // for full list of fetched pokemons
  const [displayedPokemons, setDisplayedPokemons] = useState<IPokemon[]>([]); //for pokemons that are displayed on screen
  const [currentPokemon, setCurrentPokemon] = useState<IPokemonInfo>({} as IPokemonInfo);
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
    //Updating displayed pokemons after new fetches
    setDisplayedPokemons(pokemons); 
  }, [pokemons]);

  useEffect(() => {
    if (typesFilter.length === 0) {
      //if there aren't filters, render all fetched pokemons
      setDisplayedPokemons(pokemons);
      return;
    }
    //Checking if at least one pokemon type matches the filter 
    const filteredPokemons = pokemons.filter((pokemon: any) => {
      return pokemon.types.some((type: any) => {
        return typesFilter.includes(type.type.name);
      });
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
      <TypesFilter typesFilter={typesFilter} setTypeFilters={setTypesFilter} />
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

      {typesFilter.length > 0 && (
        <p className={styles.loadMoreHint}>
          Note: please remove filters for load more
        </p>
      )}
      <button
        type="button"
        className={styles.loadMoreBtn}
        onClick={fetchPokemons}
        // disabling load more button here as having filters selected and clicking load more button can
        // lead to situation that new loaded peace of data will not match filters and user will see no changes, what I thing is bad UX
        disabled={typesFilter.length > 0} 
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
