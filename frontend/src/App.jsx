import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Modal from './components/Modal';

import baseApi from './components/shared/baseApi';

export default function App() {
  const [state, setState] = useState({
    ingredients: [],
    tags: [],
    allRecipes: [
      {
        title: 'Example Title 1',
        minutes: 10,
        ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
        tags: ['tag 1', 'tag 2', 'tag 3', 'test2'],
        directions: ['step 1', 'step 2', 'step 3'],
      },
      {
        title: 'Example Title 2',
        minutes: 30,
        ingredients: ['ingredient 4', 'ingredient 5', 'ingredient 6'],
        tags: ['tag 1', 'tag 3', 'tag 4', 'tag 5'],
        directions: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5'],
      }
    ],
    recipes: [],
    index: 0,
    unselected: ['test1', 'test2', 'test2 5', 'z', 'bruh', 'what', '3432', 'hmmmm', 'ok'],
    displayModal: false,
    clear: false,
    refresh: false,
  });

  useEffect(() => {
    baseApi.get('search/', {
      params: {
        ingredients: state.ingredients
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }, [state.ingredients]);

  useEffect(() => {
    let temp = state.allRecipes.slice();
    for (let i = temp.length - 1; i >= 0; i--) {
      for (let j = 0; j < state.tags.length; j++) {
        if (!temp[i].tags.includes(state.tags[j])) {
          temp.splice(i, 1);
          break;
        }
      }
    }

    setState(prevState => ({
      ...prevState,
      recipes: temp,
    }));
    //let r = allRecipes.filter(e => e.tags.includes)
  }, [state.ingredients, state.tags])

  const toggleModal = () => {
    setState(prevState => ({
      ...prevState,
      displayModal: !state.displayModal,
    }))
  }

  useEffect(() => {
    if (state.clear) {
      let x = state.unselected.slice();
      for (let i = 0; i < state.tags.length; i++) {
        x.push(state.tags[i]);
      }
      setState(prevState => ({
        ...prevState,
        tags: [],
        unselected: x,
        clear: false,
        refresh: !state.refresh,
      }));
    } else {
      let x = state.tags.slice();
      let y = state.unselected.slice();
      x.sort();
      y.sort();
      setState(prevState => ({
        ...prevState,
        tags: x,
        unselected: y,
      }));
    }
  }, [state.refresh]);

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

  const addTag = (id) => {
    let t = state.unselected.slice();
    let next = state.tags.slice();
    let move = t.splice(id, 1);
    next.push(move[0]);
    setState(prevState => ({
      ...prevState,
      tags: next,
      unselected: t,
      refresh: !state.refresh,
    }));
  }

  const removeTag = (id) => {
    let t = state.tags.slice();
    let next = state.unselected.slice();
    let move = t.splice(id, 1);
    next.push(move[0]);
    setState(prevState => ({
      ...prevState,
      tags: t,
      unselected: next,
      refresh: !state.refresh,
    }));
  }

  const clear = () => {
    setState(prevState => ({
      ...prevState,
      refresh: !state.refresh,
      clear: true,
    }));
  }

  return (
    <>
      <GlobalStyle />
      <Modal
        visible={state.displayModal}
        show={() => {toggleModal()}}
        recipe={state.recipes[state.index]}
      />
      <Sidebar
        ingredients={state.ingredients}
        addIngredient={(x) => addIngredient(x)}
        removeIngredient={(x) => removeIngredient(x)}
      />
      <Main
        ingredients={state.ingredients.length}
        setIndex={(i) => setState(prevState => ({
          ...prevState,
          index: i,
        }))}
        unselected={state.unselected}
        tags={state.tags}
        addTag={(x) => addTag(x)}
        removeTag={(x) => removeTag(x)}
        clearAll={() => clear()}
        toggleModal={() => {toggleModal()}}
        recipes={state.recipes}
      />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #fff;
  }
`;