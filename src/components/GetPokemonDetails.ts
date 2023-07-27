import { client } from "../main";
import { GET_POKEMON_DETAILS } from "../graphql/Queries";

export type Move = {
  move: {
    name: string;
  };
  name: string;
  __typename: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  moves: Move[];
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export const GetPokemonDetails = async (
  name: string,
  cb: React.Dispatch<PokemonDetails>
) => {
  cb({} as PokemonDetails);
  const { data } = await client.query({
    query: GET_POKEMON_DETAILS,
    variables: { name },
  });
  console.log(data?.pokemon);
  cb(data?.pokemon);
};
