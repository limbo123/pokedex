import { useEffect, useState } from "react";
import { PokemonService } from "./api/pokemonService";
import Card from "./components/Card/Card";
import CurrentPokemonCard from "./components/CurrentPokemonCard/CurrentPokemonCard";
import styles from "./styles/App.module.css";
import { Oval } from "react-loader-spinner";
import TypesFilter from "./components/TypesFilter/TypesFilter";
import { IPokemon } from "./models/PokemonModel";
import { IPokemonInfo } from "./models/CurrentPokemonInfoModel";

function App() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]); // for full list of fetched pokemons
  const [allPokemonsCount, setAllPokemonsCount] = useState<number>(0);
  const [displayedPokemons, setDisplayedPokemons] = useState<IPokemon[]>([]); //for pokemons that are displayed on screen
  const [currentPokemon, setCurrentPokemon] = useState<IPokemonInfo>(
    {} as IPokemonInfo
  );
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
    setAllPokemonsCount(res.allCount);
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
      <h1 className={styles.logo}>Pokedex</h1>
      <TypesFilter typesFilter={typesFilter} setTypeFilters={setTypesFilter} />
      <div className={styles.container}>
        {displayedPokemons.length > 0 ? (
          <>
            {displayedPokemons.map((pokemon) => {
              return (
                <Card
                  key={pokemon.name}
                  pokemonInfo={pokemon}
                  setCurrentPokemon={setCurrentPokemon}
                />
              );
            })}
          </>
        ) : (
          <h3>No pokemons to match filters</h3>
        )}
      </div>

      <p className={styles.loadingStats}>
        Loaded: {pokemons.length}/{allPokemonsCount}
      </p>
      <button
        type="button"
        className={styles.loadMoreBtn}
        onClick={fetchPokemons}
      >
        {isLoading ? <Oval color="#fff" height={30} width={30} /> : "Load More"}
      </button>
      <CurrentPokemonCard pokemonInfo={currentPokemon} />

      <button className={styles.scrollToTopBtn} onClick={scrollToTop}>
        To top
      </button>
    </>
  );
}

export default App;
