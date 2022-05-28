import axios from 'axios';
import { useState, useEffect } from 'react';

const url= 'localhost:3001/search';

export default function API(props) {
  const [res, setRes] = useState();

  useEffect(() => {
    if (props.params) {
      axios.get(url, {
        params: props.params
      }).then((r) => {
        setRes(r.data);
      });
    }
  }, []);

  return res;
}