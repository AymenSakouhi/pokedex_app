import * as React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    console.log("Hello world!");
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold bg-slate-400 text-black">
        Pokedex app
      </h1>
    </>
  );
}

export default App;
