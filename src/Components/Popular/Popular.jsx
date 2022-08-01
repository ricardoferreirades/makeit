import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// or only core styles
import "@splidejs/react-splide/css/core";

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
    <Splide
      aria-label="top products"
      options={{
        perPage: 3,
        gap: "1rem",
      }}
    >
      {popular.map((product) => (
        <SplideSlide key={product.id}>
          <div>
            <span>{product.title}</span>
            <img src={product.image} alt={product.title} />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default Popular;
