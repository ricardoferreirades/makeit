import React, { useState, useEffect } from "react";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    let data = window.localStorage.getItem("popular");

    if (data) {
      setPopular(JSON.parse(data));
    } else {
      const api = await fetch(
        `${process.env.BASE_URL}/random?apiKey=${process.env.API_KEY}&number=9`
      );

      data = await api.json();
      window.localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <>
      {popular.map((p) => (
        <div key={p.id}>
          <span>{p.title}</span>
          <img src={p.image} alt={p.title} />
        </div>
      ))}
    </>
  );
}

export default Popular;
