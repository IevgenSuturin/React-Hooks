// import React, { useState, useEffect, useCallback } from "react";

// import IngredientForm from "./IngredientForm";
// import IngredientList from "./IngredientList";
// import ErrorModal from "../UI/ErrorModal";
// import Search from "./Search";

// const Ingredients = () => {
//   const [userIngredients, setUserIngredients] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const filteredEngredientsHandler =  useCallback(filetedIngredients => {
//     setUserIngredients(filetedIngredients);
//   }, []);

//   useEffect(() => {
//     console.log('RENDERING INGREEDIENTS', userIngredients);
//   }, [userIngredients]);

//   const addIngredientHandler = (ingredient) => {
//     setIsLoading(true);
//     fetch('https://ysuturin-react-hooks-updates-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
//       method: 'POST',
//       body: JSON.stringify(ingredient),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       setIsLoading(false);
//       return response.json();
//     })
//     .then(responseData => {
//           setUserIngredients((prevIngredients) => [
//             ...prevIngredients,
//             {
//               id: responseData.name,
//               ...ingredient,
//             },
//           ]);
//     });
//   };

//   const removeIngredientHandler = (id) => {
//     setIsLoading(true)
//     fetch(`https://ysuturin-react-hooks-updates-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`, {
//       method: 'DELETE'
//     }).then (response => {
//           setIsLoading(false);
//           setUserIngredients((prevIngredients) =>
//             prevIngredients.filter((item) => item.id !== id)
//           );
//     }).catch(error => {
//       setError('Something went wrong!');
//       setIsLoading(false);
//     })
//   }

//   const clearErrorHandler = () => {
//     setError(null);
//   }

//   return (
//     <div className="App">
//       {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}

//       <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

//       <section>
//         <Search OnLoadIngredeints={filteredEngredientsHandler} />
//         <IngredientList
//           ingredients={userIngredients}
//           onRemoveItem={removeIngredientHandler}
//         />
//       </section>
//     </div>
//   );
// };

// export default Ingredients;
