import React, { useState, useEffect } from "react";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `${process.env.BASE_URL}/random?apiKey=${process.env.API_KEY}&number=9`
    );
    const data = await api.json();
    console.log(data);
    setPopular(data.recipes);
  };

  return (
    <>
      {popular.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </>
  );
}

export default Popular;
