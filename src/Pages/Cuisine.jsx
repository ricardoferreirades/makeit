import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        const receips = await data.json();

        if (receips.results && receips.results.length > 0) {
          window.localStorage.setItem(name, JSON.stringify(receips.results));
          setCuisine(receips.results);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    console.log(params);
    getCuisine(params.type);
  }, [params.type]);
  return (
    <>
      {cuisine.map((_cuisine) => (
        <div key={_cuisine.id}>{_cuisine.title}</div>
      ))}
    </>
  );
}

export default Cuisine;
