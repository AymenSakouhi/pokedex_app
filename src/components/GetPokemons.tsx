import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "../graphql/Queries";

type Pokemon = {
  name: string;
  image: string;
  __typename: string;
};

const GetPokemons = () => {
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(15);
  const { loading, error, data } = useQuery(GET_ALL_POKEMONS, {
    variables: { offset, limit },
  });
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  useEffect(() => {
    setPokemons(data?.pokemons?.results);
  }, [data]);

  return (
    <div>
      <div className="grid md:grid-cols-6 items-center text-white">
        {pokemons ? (
          pokemons?.map((pokemon: Pokemon) => (
            <div
              key={Math.random().toString(26).slice(2)}
              className="p-3 border m-3 flex flex-col justify-center items-center srounded-xl shadow-lg bg-gray-800 text-white w-64 h-64 md:col-span-2"
            >
              <p className="line-clamp-6">{pokemon.name}</p>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
          ))
        ) : (
          <div className="p-3 border m-3 flex fle-xcol justify-center items-center srounded-xl shadow-lg bg-gray-800 text-white w-64 h-64 md:col-span-6">
            Loading...
          </div>
        )}
      </div>
      {/* pagination */}
      <div className="w-full flex justify-center items-center">
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => {
            if (offset === 0) return;
            setOffset(offset - 15);
          }}
        >
          Previous
        </button>

        <button
          className="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => {
            if (limit === 1281) return;
            setOffset(offset + 15);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetPokemons;
