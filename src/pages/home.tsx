import styles from "./styles/base.module.scss";
import { useState } from 'react'
import Head from "next/head";
import Header from '../Components/Header';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from "../../services/api";
import SearchIcon from '@material-ui/icons/Search';
import Activity from '../Components/Activity'
import { listAtivitiesCursorProps, listAtivitiesProps} from "../types";
import InfiniteScroll from 'react-infinite-scroll-component'
import UnauthorizedAccess from '../Components/UnauthorizedAccess'

export default function Home() {

  const token = Cookies.getJSON('token');

  if(!token)
    return(<UnauthorizedAccess />)

  const path: string = 'activities/listCursor';

  let res : listAtivitiesCursorProps  = null;
  const [listativities, setListativities] = useState<listAtivitiesProps>([]);

  const [cursor, setCursor] = useState<string>(null);

  const [endlist, setEndlist] = useState<boolean>(true);

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  const SearchEnter = async (e) => {
    if(e.key === 'Enter'){
      //console.log('enter')
      await api.get(`activities/search/?keyword=${val}`,config).then((response) => {
        console.log(response.data)
        setEndlist(false);
        setListativities(response.data)
      })
    }
  }
  const Search = async () => {
    
    await api.get(`activities/search/?keyword=${val}`,config).then((response) => {
      setEndlist(false);
      setListativities(response.data)
    })

  }

  const [val, setVal] = useState("");

  const handleVal = (e) => {
    setVal(e.target.value)
    if(e.target.value==="" || e.target.value === null ){
      setListativities([]);
      setCursor(null);
      setEndlist(true);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }  
  , [])
  
 function fetchData() {
  console.log('fetch')
     api.post(path, cursor, config).then( (response) => {

      res = response.data;
      if(res.results.length === 0 ){
        setEndlist(false);
        return;
      }
      setListativities((current) => 
        current.concat(response.data.results)   
    )
    setCursor(response.data.cursorString)
    });
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

      <div className={styles.other} />
       
    </div>
  )
}

