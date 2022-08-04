import React, { FC, useEffect, useState } from "react";
import { TypesService } from "../../api/typesService";
import { IResultsData } from "../../models/ResultsData";
import styles from "./TypesFilter.module.css";

interface TypesFilterProps {
    setTypeFilters: (newFilters: string[]) => void,
    typesFilter: string[]
}

const TypesFilter: FC<TypesFilterProps> = ({ typesFilter, setTypeFilters }) => {
  const [allTypes, setAlltypes] = useState<IResultsData[]>([]);
  const [isFiltersShowing, setIsFiltersShowing] = useState(false);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const res = await TypesService.getAllTypes();
    // console.log(res.data.results);
    setAlltypes(res.data.results);
  };

  const toggleFilter = (e: React.SyntheticEvent) => {
    const element: HTMLLIElement = e.target as HTMLLIElement;
    // console.log(element.textContent);
    if(typesFilter.includes(String(element.textContent))) {
        // element.classList.remove(styles.activeFilter);
        setTypeFilters(typesFilter.filter(type => type !== element.textContent))
        return;
    }
    // element.classList.add(styles.activeFilter);
    const newFilter = [...typesFilter, String(element.textContent)];
    setTypeFilters(newFilter);
  }
  return (
    <>
      <button
        className={styles.handleFiltersBtn}
        onClick={() => setIsFiltersShowing((prev) => !prev)}
      >
        {isFiltersShowing ? "Hide filters" : "Show filters"}
      </button>

      {isFiltersShowing && (
        <div className={styles.container}>
          <h1>Filter for type</h1>
          <ul className={styles.typesList}>
            {allTypes.map((type: any) => {
              return <li onClick={toggleFilter} className={typesFilter.includes(type.name) ? styles.activeFilter : null} key={type.name}>{type.name}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default TypesFilter;
