import React, { useReducer, 
  // useState, 
  useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentInredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentInredients, action.ingredient];
    case 'DELETE':
      return currentInredients.filter(ingredient => ingredient.id !== action.id);
    default: throw new Error('Should not get there!');
  };
}

const Ingredients = () => {
  const [userIngredients, dispatch ] = useReducer(ingredientReducer, []);
  const {isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

  const filteredEngredientsHandler =  useCallback(filetedIngredients => {
    dispatch({type: 'SET', ingredients: filetedIngredients});
  }, []);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'DELETE_INGREDIENT') {
      dispatch({type: 'DELETE', id: reqExtra})
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra }})
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      'https://ysuturin-react-hooks-updates-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback((ingredientId) => {
    sendRequest(
      `https://ysuturin-react-hooks-updates-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'DELETE_INGREDIENT'
    )
  }, [sendRequest]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
    />
    )
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search OnLoadIngredeints={filteredEngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
