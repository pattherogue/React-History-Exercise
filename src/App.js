import React, { useState, useEffect } from "react";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. */

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokes = async () => {
      const fetchedJokes = [];
      while (fetchedJokes.length < 5) {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json"
          }
        });
        const data = await response.json();
        if (!fetchedJokes.some(joke => joke.id === data.id)) {
          fetchedJokes.push({
            id: data.id,
            joke: data.joke,
            votes: 0
          });
        }
      }
      setJokes(fetchedJokes);
      setLoading(false);
    };

    fetchJokes();
  }, []);

  const handleVote = (id, type) => {
    const updatedJokes = jokes.map(joke => {
      if (joke.id === id) {
        return {
          ...joke,
          votes: type === "up" ? joke.votes + 1 : joke.votes - 1
        };
      }
      return joke;
    });
    setJokes(updatedJokes);
  };

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <JokeList jokes={jokes} handleVote={handleVote} />
      )}
    </div>
  );
}

export default App;
