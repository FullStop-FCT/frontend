import styles from "./styles/base.module.scss";
import { useState } from 'react'
import Head from "next/head";
import Header from '../Components/Header';
import { AuthContext } from '../Context/AuthContext';
import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from "../../services/api";
import useSWR from 'swr';
import { useRouter } from 'next/router'
import SessionOf from '../Components/SessionOf';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Activity from '../Components/Activity'
import { Token, listAtivitiesProps, AtivitiesProps } from "../types";
import Loading from "../Components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";



export default function Home() {

  
  let cursor: string = null;
  const path: string = '/activities/listCursor';

  let res = null;

  const token: Token = Cookies.getJSON('token');

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  const { subAtivity, setSubAtivity, authenticated } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!authenticated) {
      router.push('/login')
    }
  }, [])

  const [state, setState] = useState({
    checkedA: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [val, setVal] = useState("");

  const handleVal = (e) => {
    setVal(e.target.value)
  }

  const {data, error} = useSWR(path, fetcher);

  console.log(error);

  async function fetcher(path) {

    console.log("entrou");
    return await api.post(path, cursor, config).then( function(response) {
      res = response.data.results.reverse();
      console.log("res" + res);
      cursor = response.data.cursorString;
      console.log(cursor);});
  }



  async function fetchData() {

    console.log("enoutr 2")


    return await api.post(path, cursor, config).then( function(response) {
      
      res = response.data.results.reverse();
      console.log("res" + res);
      cursor = response.data.cursorString;
      console.log(cursor);});
  }


 

  return (

    <div className={styles.container} >

      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.header} >
        <Header />
      </div>

      <div className={styles.Feed}>

        <div className={styles.searchBar}>
          <button><SearchIcon fontSize="large" ></SearchIcon></button>
          <input className={styles.formP} name="pesquisa" placeholder="Pesquisa" onChange={(e) => handleVal(e)}></input>
        </div>


        <InfiniteScroll
          dataLength={5} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {res.map((ativ, index) => < Activity {...ativ} key={index} /> )}
        </InfiniteScroll>


      </div>

      <div className={styles.other}>
        <h1>Filtros</h1>
        <FormControlLabel className={styles.filters}
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="default"
            />
          }
          label="Mostrar apenas atividades das organizações que sigo"
        />
        <FormControlLabel className={styles.filters}
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="default"
            />
          }
          label="Mostrar apenas atividades de organizações"
        />
        <FormControlLabel className={styles.filters}
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="default"
            />
          }
          label="Mostrar apenas atividades de indivíduos"
        />
        <br />
      </div>
    </div>
  )
}

