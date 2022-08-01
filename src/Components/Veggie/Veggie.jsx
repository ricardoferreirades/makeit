import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// or only core styles
import "@splidejs/react-splide/css/core";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    let data = window.localStorage.getItem("veggie");

    if (data) {
      setVeggie(JSON.parse(data));
    } else {
      const api = await fetch(
        `${process.env.BASE_URL}/random?apiKey=${process.env.API_KEY}&number=9&tags=vegetarian`
      );

      data = await api.json();
      window.localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
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
      {veggie.map((veggie) => (
        <SplideSlide key={veggie.id}>
          <div>
            <span>{veggie.title}</span>
            <img src={veggie.image} alt={veggie.title} />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default Veggie;
