import { client } from "../main";
import { GET_POKEMON_DETAILS } from "../graphql/Queries";

export type Move = {
  name: string;
  __typename: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    __typename: string;
  };
  moves: Move[];
};

export const GetPokemonDetails = async (
  name: string,
  cb: React.Dispatch<React.SetStateAction<PokemonDetails>>
) => {
  const { data } = await client.query({
    query: GET_POKEMON_DETAILS,
    variables: { name },
  });
  console.log(data?.pokemon);
  cb(data?.pokemon);
};
