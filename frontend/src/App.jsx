import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Modal from './components/Modal';

export default function App() {
  const [state, setState] = useState({
    ingredients: [],
    displayModal: false,
  });

  const toggleModal = () => {
    setState(prevState => ({
      ...prevState,
      displayModal: !state.displayModal,
    }))
  }

  const addIngredient = (x) => {
    if (!x) return;
    
    let temp = state.ingredients.slice();
    for (let i = 0; i < state.ingredients.length; i++) {
      if (state.ingredients[i].val === x) {
        return;
      }
    }
    temp.push({
      id: state.ingredients.length,
      val: x,
    });
    setState(prevState => ({
      ...prevState,
      ingredients: temp,
    }));
  }

  const removeIngredient = (id) => {
    let temp = state.ingredients.slice();
    for (let i = 0; i < state.ingredients.length; i++) {
      if (state.ingredients[i].id === id) {
        temp.splice(i, 1);
        break;
      }
    }
    setState(prevState => ({
      ...prevState,
      ingredients: temp,
    }));
  }

  return (
    <>
      <GlobalStyle />
      <Modal
        visible={state.displayModal}
        invisible={!state.displayModal}
        show={() => {toggleModal()}}
      />
      <Sidebar
        ingredients={state.ingredients}
        addIngredient={(x) => addIngredient(x)}
        removeIngredient={(x) => removeIngredient(x)}
      />
      <Main toggleModal={() => {toggleModal()}}/>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #f1efe9;
  }
`;