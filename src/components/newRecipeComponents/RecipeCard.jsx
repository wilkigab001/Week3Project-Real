import React from "react";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/recipe/${recipe.recipe_id}`)
    }
  return (
      <div className="recipe_card">
        <div className="recipe_card_container">
          {/* //Accesses the recipe image */}
          <img src={recipe.image_url} />
          <div className="recipe_card_lower_half">
            {/* //Accesses the recipe name */}
            <h1>{recipe.recipe_name}</h1>
            <button onClick={clickHandler}>See More</button>
          </div>
        </div>
      </div>
  );
};

export default RecipeCard;
