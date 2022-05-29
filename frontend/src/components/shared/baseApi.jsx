import axios from 'axios';

export default axios.create({
  baseURL: `https://wildhacks-frigo.herokuapp.com/`
})