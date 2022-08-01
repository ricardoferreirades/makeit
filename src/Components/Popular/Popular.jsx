import React, { useState, useEffect } from "react";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `${process.env.BASE_URL}/random?apikey=${process.env.API_KEY}`
    );
    const data = await api.json();
    console.log(data);
  };

  return (
    <>
      {popular.map((p) => (
        <div key={p.id}>foo</div>
      ))}
    </>
  );
}

export default Popular;
