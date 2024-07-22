import React, { useState, useEffect } from "react";

function Joke() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetch("https://api.balldontlie.io/v1/teams", {
      method: "GET",
      headers: {
        Authorization: "374aaa89-d6be-4e2d-a597-9471b92949ce",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (joke == null) return <h1>Loading...</h1>;

  return (
    <>
      <ul className="list-none">
        {joke.map((a, i) => (
          <li className="list-none" key={i}>
            <p>{a.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Joke;
