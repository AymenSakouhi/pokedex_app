import "./App.css";
import GetPokemons from "./components/GetPokemons.tsx";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold light:text-black dark:text-rose-50">
        Pokedex app
      </h1>
      <GetPokemons />
    </>
  );
}

export default App;
