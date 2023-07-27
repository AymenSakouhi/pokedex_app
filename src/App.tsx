import * as React from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = React.useState<boolean>(true); // eslint-disable-line @typescript-eslint/no-unused-vars

  const getPokeDexInfo = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    console.log(data);
  };

  React.useEffect(() => {
    console.log("Hello world!");
    getPokeDexInfo("pikachu");
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold bg-white text-black">Pokedex app</h1>
    </>
  );
}

export default App;
