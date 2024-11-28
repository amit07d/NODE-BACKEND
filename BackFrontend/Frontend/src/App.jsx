import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
      <h1>Frontend & Backend Connect (FullStack Proxy and Cors)</h1>
      <p>JOKES: {jokes.length}</p>

      {Array.isArray(jokes) && jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
