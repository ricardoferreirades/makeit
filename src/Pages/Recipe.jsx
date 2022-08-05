import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
function Recipe() {
  const [recipe, setRecipe] = useState();
  const [activeTab, setActiveTab] = useState("Ingredients");
  const params = useParams();

  const getRecipe = async (id) => {
    try {
      let data = JSON.parse(window.localStorage.getItem("recipe"));

      if (data) {
        setRecipe(data);
      } else {
        data = await fetch(
          `${process.env.BASE_URL}/${id}/information?apiKey=${process.env.API_KEY}`
        );
        const recipeJSON = await data.json();

        if (recipeJSON && recipeJSON.id) {
          window.localStorage.setItem("recipe", JSON.stringify(recipeJSON));
          setRecipe(recipeJSON.results);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecipe(params.id);
  }, [params.id]);

  const onTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return recipe ? (
    <div>
      <figure>
        <img src={recipe.image} alt={recipe.title} />
      </figure>

      <div>
        <div>
          <button onClick={() => onTabChange("Ingredients")}>
            Ingredients
          </button>
          <button onClick={() => onTabChange("Instructions")}>
            Instructions
          </button>
        </div>

        {activeTab === "Ingredients" && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></motion.div>
        )}
        {activeTab === "Instructions" && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          ></motion.div>
        )}
      </div>
    </div>
  ) : null;
}

export default Recipe;
