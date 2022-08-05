import React, { FC, useEffect, useState } from "react";
import { TypesService } from "../../api/typesService";
import { IResultsData } from "../../models/response/ResponseData";
import styles from "./TypesFilter.module.css";
import typesColors from "../../сolorsOfTypes.json";
import { BsFilterLeft } from "@react-icons/all-files/bs/BsFilterLeft";

interface TypesFilterProps {
  setTypeFilters: (newFilters: string[]) => void;
  typesFilter: string[];
}

const TypesFilter: FC<TypesFilterProps> = ({ typesFilter, setTypeFilters }) => {
  const [allTypes, setAlltypes] = useState<IResultsData[]>([]);
  const [isFiltersShowing, setIsFiltersShowing] = useState(false);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const res = await TypesService.getAllTypes();
    setAlltypes(res.data.results);
  };
  // checking if event target text content is already exists in filters, and then adding/removing it from filters
  const toggleFilter = (e: React.SyntheticEvent) => {
    const element: HTMLLIElement = e.target as HTMLLIElement;
    if (typesFilter.includes(String(element.textContent))) {
      setTypeFilters(
        typesFilter.filter((type) => type !== element.textContent)
      );
      return;
    }
    const newFilter = [...typesFilter, String(element.textContent)];
    setTypeFilters(newFilter);
  };
  return (
    <>
      <button
        className={styles.handleFiltersBtn}
        onClick={() => setIsFiltersShowing((prev) => !prev)}
      >
        {isFiltersShowing ? "Hide filters" : "Show filters"}
        <BsFilterLeft />
      </button>

      {isFiltersShowing && (
        <div className={styles.container}>
          <h1>Filter by type</h1>
          <ul className={styles.typesList}>
            {allTypes.map((type) => {
              return (
                <li
                  onClick={toggleFilter}
                  //setting background color of corresponding type if this type exists in filters
                  style={
                    typesFilter.includes(type.name)
                      ? {
                          background:
                            typesColors[type.name as keyof typeof typesColors],
                          color: "#fff",
                        }
                      : {}
                  }
                  key={type.name}
                >
                  {type.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default TypesFilter;
