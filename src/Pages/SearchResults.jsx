import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchResults() {
  const [results, setResults] = useState([]);
  const params = useParams();

  const getResults = async (term) => {
    let dataJson = JSON.parse(window.localStorage.getItem(term));
    if (dataJson && dataJson.length > 0) {
      setResults(dataJson);
    } else {
      const data = await fetch(
        `${process.env.BASE_URL}/complexSearch?apiKey=${process.env.API_KEY}&query=${term}&number=9&`
      );
      const dataJson = await data.json();
      if (!!dataJson.results && dataJson.results.length > 0) {
        window.localStorage.setItem(term, JSON.stringify(dataJson.results));
        setResults(dataJson.results);
      }
    }
  };

  useEffect(() => {
    getResults(params.value);
  }, [params.value]);

  return (
    <>
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </>
  );
}

export default SearchResults;
