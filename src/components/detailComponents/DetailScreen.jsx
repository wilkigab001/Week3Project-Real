import React, { useEffect, useState } from "react";
import "./DetailScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailScreen = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios.get(`https://recipes.devmountain.com/recipes/${id}`).then((res) => {
      console.log(res.data);
      setRecipe(res.data);
    });
  }, []);

  return (
    <section>
      <section style={{
        background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${recipe.image_url})`,
        backgroundSize: "cover",
      }}className="top_half">
        <h1>{recipe.recipe_name}</h1>
      </section>
      <div className="bottom_half_of_display">
        <div className="recipe_ingredients_card">
          <div className="recipe">
            <h2>Recipe</h2>
            <p>Prep Time: {recipe.prep_time}</p>
            <p>Cook Time: {recipe.cook_time}</p>
            <p>Serves: {recipe.serves}</p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            {recipe.ingredients && recipe.ingredients.map((el, index) => {
              return (
                <h4>
                  {el.quantity} {el.ingredient}
                </h4>
              );
            })}
          </div>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            {recipe.instructions && JSON.parse(recipe.instructions)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailScreen;
