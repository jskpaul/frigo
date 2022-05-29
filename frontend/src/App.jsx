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
    recipes: [],
    index: 0,
    unselected: [],
    timeFilter: 0,
    displayModal: false,
    clear: false,
    refresh: false,
    loading: false,
  });

  useEffect(() => {
    baseApi.get(`alltags`)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          unselected: Object.keys(res.data),
        }));
      });
  }, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    const process = (resString) => {
      let i = resString.replaceAll('"', '`');
      i = i.replace("['", '["');
      i = i.replace("']", '"]');
      i = i.replace("[`", '["');
      i = i.replace("`]", '"]');
      i = i.replaceAll(`', '`, '", "');
      i = i.replaceAll("`, '", '", "');
      i = i.replaceAll("', `", '", "');
      i = i.replaceAll('`', `\\\"`);

      return JSON.parse(i);
    }

    let params = {
      'ingredients': state.ingredients.map((e) => {
        return e.val;
      }).join(),
    };

    if (state.tags.length) {
      params['tags'] = state.tags.join();
    }

    if (state.timeFilter) {
      params['time'] = [state.timeFilter].join();
    }

    baseApi.get(`search`, {
      params: params,
    })
    .then(res => {
      let temp = [];
      for (let i in res.data) {
        temp.push({
          title: res.data[i][0].toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' '),
          minutes: res.data[i][2],
          ingredients: process(res.data[i][10]),
          tags: process(res.data[i][5]),
          directions: process(res.data[i][8]),
        });
      }
      setState(prevState => ({
        ...prevState,
        recipes: temp,
        loading: false,
      }));
    })
    .catch(e => {
      setState(prevState => ({
        ...prevState,
        recipes: [],
        loading: false,
      }))
    });
  }, [state.ingredients, state.tags]);

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

  const clearIng = () => {
    setState(prevState => ({
      ...prevState,
      ingredients: [],
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
        clearAll={() => clearIng()}
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
        loading={state.loading}
        updateTime={(x) => setState(prevState => ({
          ...prevState,
          timeFilter: x,
          refresh: !state.refresh,
        }))}
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