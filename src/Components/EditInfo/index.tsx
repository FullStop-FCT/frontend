import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import { api, storageProfilePic } from '../../../services/api';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { format } from 'date-fns'
import Image from 'next/image'

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {

  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
        className: styles.form

      }} />
  )
}

const validationSchema = Yup.object({
  profile: Yup.string().required(),
  phoneNumber: Yup.number().typeError("Não pode conter letras."),
  mobileNumber: Yup.number().typeError("Não pode conter letras."),
  address: Yup.string(),
  location: Yup.string(),
  postalCode: Yup.string().matches(/^\d\d\d\d-\d\d\d$/, "Formato correto: Ex: 1234-567"),
  birthday: Yup.string(),
  gender: Yup.string(),

});



type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    background: 'linear-gradient(45deg, #fff 30%, #fff 90%)',
  },
}));
type userProps = {
  username: string;
  name: string;
  email: string;
  profile: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  location: string;
  postalCode: string;
  birthday: string;
  gender: string;

}

export default function EditInfo(user: userProps) {
  const [gender, setGender] = useState(user.gender);
  const [profile, setProfile] = useState(user.profile)
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChangeProfile = (event) => {
    setProfile(event.target.value);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };
  const classes = useStyles();
  const token: Token = JSON.parse(Cookies.get('token'));
  const myLoader = () => {
    return `https://storage.googleapis.com/imagens-helpin-hand/${token.username}.jpg`
  }
  const router = useRouter();
  const { subAtivity, setSubAtivity } = useContext(AuthContext);
  const { authenticated, activityLocation, setActivityLocation } = useContext(AuthContext);
  const [photoState, setphotoState] = useState(null);
  const [photopreviewState, setphotopreviewState] = useState(null);
  const photoHandler = (event) => {
    console.log(event.target.files[0])
    setphotoState(event.target.files[0])
    setphotopreviewState(URL.createObjectURL(event.target.files[0]))
    console.log(photopreviewState);
    console.log(photoState)
  }

  return (
    <div className={styles.container}>
      <div>


        <div className={styles.banneravatar}>

          <div className={styles.banner}>
            <div className={styles.avatar}>
              {
                photopreviewState == null ? <Image
                  loader={myLoader}
                  src="me.png"

                  placeholder="blur"
                  width={160}
                  height={160}
                  className={styles.image}
                /> : <img src={photopreviewState} className={styles.imagepreview} />
              }
            </div>

            <div className={styles.icon}>
              <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={photoHandler} />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span" className={styles.iconbutton} >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>

          </div>
        </div>
        <Formik initialValues={{
          profile: user.profile,
          phoneNumber: user.phoneNumber,
          mobileNumber: user.mobileNumber,
          address: user.address,
          location: user.location,
          postalCode: user.postalCode,
          birthday: user.birthday,
          gender: user.gender,


        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting }) => {

            console.log("submitting");
            setSubmitting(true);
            const fd = new FormData();
            fd.append('image', photoState);
            console.log(fd.get('type'));
            if (authenticated) {
              await storageProfilePic.post(token.username + '.jpg', fd)
                .then(function (response) {
                  console.log(response)
                  console.log('upload')
                }).catch(function (error) {

                  console.log(error);
                })
            }


            //alert('sem location')




            setSubmitting(false);
            //router.reload()
          }}>


          {({ isSubmitting }) => (

            <Form className={styles.form} >
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  displayEmpty
                  open={openProfile}
                  onClose={handleCloseProfile}
                  onOpen={handleOpenProfile}
                  value={profile}
                  onChange={handleChangeProfile}
                >
                  <MenuItem value="" disabled>
                    Tipo de Perfil
                  </MenuItem>
                  <MenuItem value={'PUBLIC'}>Público</MenuItem>
                  <MenuItem value={'PRIVATE'}>Privado</MenuItem>
                </Select>
              </FormControl>

              <MyTextField placeholder="phoneNumber" name="phoneNumber" type="input" as={TextField} />
              <MyTextField placeholder="mobileNumber" name="mobileNumber" type="input" as={TextField} />
              <MyTextField placeholder="address" name="address" type="input" as={TextField} />
              <MyTextField placeholder="location" name="location" type="input" as={TextField} />
              <MyTextField placeholder="postalCode" name="postalCode" type="input" as={TextField} />
              <TextField
                id="date"
                label="Data nascimento"
                type="date"
                defaultValue={user.birthday}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  displayEmpty
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={gender}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Selecionar Género
                  </MenuItem>
                  <MenuItem value={'Masculino'}>Masculino</MenuItem>
                  <MenuItem value={'Feminio'}>Feminio</MenuItem>
                  <MenuItem value={'Não Binário'}>Não Binário</MenuItem>
                </Select></FormControl>



              <div>
                <Button disabled={isSubmitting} type="submit">save</Button>
              </div>
            </Form>



          )


          }
        </Formik>
      </div>

    </div >

  );

}
