import { React, useState, useEffect } from "react";
import AdBanner from "./AdBanner";
import axios from "axios";
import RecipeCard from "../newRecipeComponents/RecipeCard";
import { FaSearch } from "react-icons/fa";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    axios.get("https://recipes.devmountain.com/recipes").then((res) => {
      setRecipes(res.data)
      console.log(res.data);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const recipeSearch = recipes
    .filter((recipe, index) => {
      let title = recipe.recipe_name.toLowerCase();
      //gets search from the input because that is it's value
      let searchParams = search.toLowerCase();
      //compares if the title equals the search input, updates with every keystroke
      return title.includes(searchParams);
    })
    .map((recipe, index) => {
      //if there is no input in the search bar it will send every single recipe with this .map function, if there is, it will return the recipe that matches the search input
      return <RecipeCard recipe={recipe} />;
    });

  return (
    <div>
      <AdBanner />
      <div className="span__input">
        <span className="input">
          <FaSearch className="input__icon" />
          <input
            className="cards__search"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a recipe..."
          ></input>
        </span>
      </div>
      <div className="recipe_search">{recipeSearch}</div>
    </div>
  );
};

export default HomeScreen;
