import styles from "./styles/base.module.scss";
import { useState } from 'react'
import Head from "next/head";
import Header from '../Components/Header';
import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from "../../services/api";
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Activity from '../Components/Activity'
import { listAtivitiesCursorProps, listAtivitiesProps} from "../types";
import InfiniteScroll from 'react-infinite-scroll-component'
import UnauthorizedAccess from '../Components/UnauthorizedAccess'

export default function Home() {

  const token = Cookies.getJSON('token');

  if(!token)
    return(<UnauthorizedAccess />)

  //let cursor: string = null;
  const path: string = 'activities/listCursor';

  let res : listAtivitiesCursorProps  = null;
  //let listactivities: listAtivitiesProps = null;
  const [listativities, setListativities] = useState<listAtivitiesProps>([]);

  const [cursor, setCursor] = useState<string>(null);

  const [endlist, setEndlist] = useState<boolean>(true);

  const[resstart, setresStart] =  useState<boolean>(false);
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

  const SearchEnter = async (e) => {
    if(e.key === 'Enter'){
      console.log('enter')
      await api.get(`activities/search/?keyword=${val}`,config).then((response) => {
        console.log(response.data)
        setEndlist(false);
        setListativities(response.data)
      })
    }
  }
  const Search = async () => {
    
    await api.get(`activities/search/?keyword=${val}`,config).then((response) => {
      console.log(response.data)
      setEndlist(false);
      setListativities(response.data)
    })

  }

  const [val, setVal] = useState("");

  const handleVal = (e) => {
    setVal(e.target.value)
    if(e.target.value==="" || e.target.value === null ){
      setEndlist(true);
      setListativities([]);
      setCursor(null);
    }
  }

  useEffect(() => {
    fetchData();
  }  
  , [cursor])
  
 function fetchData() {
  console.log('segundo fetch')
     api.post(path, cursor, config).then( (response) => {

      res = response.data;
      if(res.results.length === 0 ){
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
          <button><SearchIcon fontSize="large" onClick={Search} onKeyDown={() => SearchEnter} ></SearchIcon></button>
          <input className={styles.formP} name="pesquisa" placeholder="Pesquisa por atividades" onChange={(e) => handleVal(e)}></input>
          </div>

          <div className={styles.scroll}>
        {

        
        <InfiniteScroll
          dataLength={listativities.length * 5} //This is important field to render the next data
          next={fetchData}
          hasMore={endlist}
          loader={<h4>Loading...</h4>}
          //scrollableTarget="target"
          endMessage={
            <div>
            <br/>
              <p style={{ textAlign: 'center' }}>
                <b>Não há mais atividades.</b>
            </p>
          </div>
          }
        >
          {
          
          !listativities ? <></> :

          listativities.map((ativ, index) => < Activity {...ativ} key={index} /> )
          
          }
          
          </InfiniteScroll>
          }
          </div>
        


      </div>

      <div className={styles.other}>
        {/*<h1>Filtros</h1>
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
        <br />*/}
        
      </div>
    </div>
  )
}

