import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();
  const getCuisine = async (name) => {
    try {
      let data = JSON.parse(window.localStorage.getItem(name));

      if (data) {
        setCuisine(data);
      } else {
        data = await fetch(
          `${process.env.BASE_URL}/complexSearch?apiKey=${process.env.API_KEY}&cuisine=${name}&number=9&`
        );
        const recipes = await data.json();

        if (recipes.results && recipes.results.length > 0) {
          window.localStorage.setItem(name, JSON.stringify(recipes.results));
          setCuisine(recipes.results);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((_cuisine) => (
        <div key={_cuisine.id}>{_cuisine.title}</div>
      ))}
    </motion.div>
  );
}

export default Cuisine;
