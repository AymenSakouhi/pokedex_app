import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "../graphql/Queries";
import { GetPokemonDetails, PokemonDetails } from "./GetPokemonDetails";
import ModalOffer from "./Modal/ModalOffer";

type Pokemon = {
  name: string;
  image: string;
  __typename: string;
};

const GetPokemons = () => {
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(15); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showModal, setShowModal] = React.useState<boolean>(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery(GET_ALL_POKEMONS, {
    variables: { offset, limit },
  });

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetails | null>(null);

  const toggleModal = (name?: string) => {
    if (name && !showModal) {
      GetPokemonDetails(name, setPokemonDetails);
      setShowModal(!showModal);
    } else if (showModal && name) {
      GetPokemonDetails(name, setPokemonDetails);
    } else {
      setShowModal(!showModal);
    }
  };

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
              className="cursor-pointer hover:bg-gray-500 p-3 border m-3 flex flex-col justify-center items-center srounded-xl shadow-lg bg-gray-800 text-white w-64 h-64 md:col-span-2"
              onClick={() => {
                toggleModal(pokemon.name);
              }}
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
        {
          showModal &&
            (pokemonDetails ? (
              <ModalOffer>
                <div
                  className="flex flex-col inset-10 md:inset-50 lg:inset-80 xl:inset-96 sm:inset-20
            justify-center items-center space-y-2
            fixed z-10 bg-white bg-opacity-90
            border-2 border-gray-500 rounded-xl shadow-lg text-black
           "
                >
                  <p>Name: {pokemonDetails?.name}</p>
                  <img
                    src={pokemonDetails?.sprites?.front_default}
                    alt={pokemonDetails?.name}
                  />
                  <div>
                    <span className="text-lg font-bold underline">Moves</span> :{" "}
                    {pokemonDetails?.moves &&
                      pokemonDetails?.moves.slice(0, 3).map((ele, idx, arr) => (
                        <span key={ele.move.name}>
                          {" "}
                          {ele.move.name} {idx !== arr.length - 1 && "/"}
                        </span>
                      ))}
                  </div>
                  <div>
                    <span className="text-lg font-bold underline">Type</span> :{" "}
                    {pokemonDetails?.types &&
                      pokemonDetails?.types.map((ele, idx, arr) => (
                        <span key={ele.type.name}>
                          {" "}
                          {ele.type.name} {idx !== arr.length - 1 && "/"}
                        </span>
                      ))}
                  </div>
                  <div className="text-lg font-bold underline">Stats</div>
                  {pokemonDetails?.stats &&
                    pokemonDetails?.stats.map((stat) => (
                      <div key={stat.stat.name} className="flex">
                        <p>
                          {stat.stat.name} : {stat.base_stat}
                        </p>
                      </div>
                    ))}
                  <button
                    className="rounded bg-blue-500 text-white px-3 py-1"
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    close
                  </button>
                </div>
              </ModalOffer>
            ) : (
              <ModalOffer>
                <div
                  className="flex flex-col inset-10 md:inset-50 lg:inset-80 xl:inset-96 sm:inset-20
            justify-center items-center space-y-5
            fixed z-10 bg-white bg-opacity-90
            border-2 border-gray-500 rounded-xl shadow-lg text-black
           "
                >
                  <div>Loading...</div>
                </div>
              </ModalOffer>
            )) // eslint-disable-line @typescript-eslint/no-unused-vars
        }
      </div>
    </div>
  );
};

export default GetPokemons;
