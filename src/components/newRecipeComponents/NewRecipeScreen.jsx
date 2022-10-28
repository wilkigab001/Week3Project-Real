import React, { useState } from "react";
import {Formik, resetForm} from "formik";
import './NewRecipeScreen.css'
import axios from "axios";

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const initialValues = {
    type: "",
    recipeName: "",
    imageUrl: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values, {resetForm}) => {
    values.ingredients = ingredients;
    console.log(values);
    axios.post("https://recipes.devmountain.com/recipes", values)
    .then(console.log('sent'))
    resetForm({values: ""})
  };

  const addIngredient = () => {
    //sets ingredients equal to the previous ingredients then adds the name and quantity of new ingredient
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const ingredientList = ingredients.map((el) => {
    return (
      <li>
        {el.quantity} {el.name}
      </li>
    );
  });

  return (
    <section className="total_form">
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="form_of_all">
            <div className="input__containers">
              <input
                type="text"
                name="recipeName"
                placeholder="Recipe Name"
                value={values.recipeName}
                onChange={handleChange}
              />
              <input
                name="imageUrl"
                placeholder="Image Url"
                value={values.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="radio__containers">
              <input
                type="radio"
                name="type"
                value="cook"
                onChange={handleChange}
              />
              <label for="cook">Cook</label>
              <input
                type="radio"
                name="type"
                value="bake"
                onChange={handleChange}
              />
              <label for="bake">Bake</label>
              <input
                type="radio"
                name="type"
                value="drink"
                onChange={handleChange}
              />
              <label for="drink">Drink</label>
            </div>

            <div className="input__containers">
              <input
                type="text"
                name="prepTime"
                placeholder="Prep Time"
                value={values.prepTime}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cookTime"
                placeholder="Cook Time"
                value={values.cookTime}
                onChange={handleChange}
              />
              <input
                type="text"
                name="serves"
                placeholder="Serves"
                value={values.serves}
                onChange={handleChange}
              />
            </div>
            <div className="input__containers">
              <div className="ingredient__form">
                <input
                  placeholder="Ingredient"
                  value={name}
                  onChange={(el) => setName(el.target.value)}
                />
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(el) => setQuantity(el.target.value)}
                />
              </div>
              <ul>{ingredientList}</ul>
            </div>
            <button type="submit" onClick={addIngredient} className="ingredients_button">
              Add Another
            </button>

            <textarea
              type="text"
              name="instructions"
              placeholder="And how exactly do you make this?"
              value={values.instructions}
              onChange={handleChange}
              className="textarea"
            ></textarea>

            <button type="submit" className="submit_button">Save</button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
