import styles from "./styles/base.module.scss";
import { useState } from 'react'
import Head from "next/head";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext'
import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { api } from "../../services/api";
import useSWR from 'swr'
import { useRouter } from 'next/router'
import SessionOf from '../Components/SessionOf'
import MapView from "../Components/Maps";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Activity from '../Components/Activity'


type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}

type AtivitiesProps = {
  ID: string,
  title: string,
  description: string,
  date: string,
  location: string,
  totalParticipants: string,
  activityOwner: string,
  category: string
}

type listAtivitiesProps = AtivitiesProps[];

//await api.post('activities/list',token)
async function fetcher(path: string): Promise<listAtivitiesProps> {

  const token: Token = Cookies.getJSON('token')
  return await api.post(path, token).then(response => response.data);

}

export default function Home() {
  const { subAtivity, setSubAtivity, authenticated } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!authenticated) {
      router.push('/login')
    }
  }, [])

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };



  const { data, error } = useSWR('activities/list', fetcher);
  const [val, setVal] = useState("");

  const handleVal = (e) => {
    setVal(e.target.value)
    console.log(val)
  }

  let props: listAtivitiesProps = data;
  console.log(data);

  if (error) { return <SessionOf /> }
  if (!data) return <div>loading...</div>

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

          <LocationOnIcon fontSize="large"></LocationOnIcon>
          <select className={styles.select} name="distrito" id="Portugal">
            <option value="Portugal">Portugal</option>
            <option value="Aveiro">Aveiro</option>
            <option value="Beja">Beja</option>
            <option value="Braga">Braga</option>
            <option value="Bragança">Bragança</option>
            <option value="Castelo Branco">Castelo Branco</option>
            <option value="Coimbra">Coimbra</option>
            <option value="Évora">Évora</option>
            <option value="Faro">Faro</option>
            <option value="Guarda">Guarda</option>
            <option value="Leiria">Leiria</option>
            <option value="Lisboa">Lisboa</option>
            <option value="Portalegre">Portalegre</option>
            <option value="Porto">Porto</option>
            <option value="Santarém">Santarém</option>
            <option value="Setúbal">Setúbal</option>
            <option value="Viana do Castelo">Viana do Castelo</option>
            <option value="Vila Real">Vila Real</option>
            <option value="Viseu">Viseu</option>
            <option value="Ilha da Madeira">Ilha da Madeira</option>
            <option value="Ilha de Porto Santo">Ilha de Porto Santo</option>
            <option value="Ilha de Santa Maria">Ilha de Santa Maria</option>
            <option value="Ilha de São Miguel">Ilha de São Miguel</option>
            <option value="Ilha Terceira">Ilha Terceira</option>
            <option value="Ilha da Graciosa">Ilha da Graciosa</option>
            <option value="Ilha de São Jorge">Ilha de São Jorge</option>
            <option value="Ilha do Pico">Ilha do Pico</option>
            <option value="Ilha do Faial">Ilha do Faial</option>
            <option value="Ilha das Flores">Ilha das Flores</option>
            <option value="Ilha do Corvo">Ilha do Corvo</option>
          </select>

        </div>



        <div>
          {props.map((ativ: AtivitiesProps, index) => {
            return (

              < Activity {...ativ} key={index} />



            )
          })}
        </div>

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

