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
import { Token, listAtivitiesCursorProps, listAtivitiesProps, AtivitiesProps} from "../types";
import Loading from "../Components/Loading";
import InfiniteScroll from 'react-infinite-scroll-component'



export default function Home() {

  
  //let cursor: string = null;
  const path: string = 'activities/listCursor';

  let res : listAtivitiesCursorProps  = null;
  //let listactivities: listAtivitiesProps = null;
  const [listativities, setListativities] = useState<listAtivitiesProps>([]);

  const [cursor, setCursor] = useState<string>(null);

  const [endlist, setEndlist] = useState<boolean>(true);
  const token = Cookies.getJSON('token');

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

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

  useEffect(() => {
    async function fetch(path){
      console.log("primeiro fetch");
      await api.post(path, cursor, config).then( function(response) { 
       res = response.data;
       setCursor(response.data.cursorString);
       setListativities(response.data.results.reverse());
      
       console.log('primeriro fetch' ,listativities)
      console.log(cursor);});
    }
    fetch(path);
      
  }  
  , [])
  
 function fetchData() {
  console.log('segundo fetch')
     api.post(path, cursor, config).then( (response) => {

      res = response.data;
      if(res.results.length ===0 ){
        setEndlist(false);
        return;
      }
      console.log(response.data.results)
      setListativities((current) => 
        current.concat(response.data.results)   
    )
    setCursor(response.data.cursorString)
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

      <div id="target" className={styles.Feed}>

          <div className={styles.searchBar}>
          <button><SearchIcon fontSize="large" ></SearchIcon></button>
          <input className={styles.formP} name="pesquisa" placeholder="Pesquisa" onChange={(e) => handleVal(e)}></input>
          </div>

        {

    
        <InfiniteScroll
          dataLength={listativities.length * 5} //This is important field to render the next data
          next={fetchData}
          hasMore={endlist}
          loader={<h4>Loading...</h4>}
          //scrollableTarget="target"
          endMessage={
          <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
          </p>
          }
        >
          {
          
          !listativities ? <></> :

          listativities.map((ativ, index) => < Activity {...ativ} key={index} /> )
          
          }
             

              
          
          
          </InfiniteScroll>
          }
        


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

