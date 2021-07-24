import { Page, Text, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { AtivitiesProps } from '../../types';


Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
      

export default function Certificate(props) {

  console.log("props componente" + props);
    return(
        <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        Helping XPerience
      </Text>

      <Image style={styles.image} src="https://storage.googleapis.com/imagenshh/black_logo.png"/>

      <Text style={styles.title}>Certificado de Voluntariado</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      
      {props.map((activity, index) => {

        return (
          <div>
            <Text style={styles.subtitle}>
              {activity.title}
            </Text>
            <Text style={styles.text}>
              desc...
            </Text>
          </div>
        )
      })}
      <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
        ocioso (que eran los más del año) se daba a leer libros de caballerías
        con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
        la caza, y aun la administración de su hacienda; y llegó a tanto su
        curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
        sembradura, para comprar libros de caballerías en que leer; y así llevó
        a su casa todos cuantos pudo haber dellos; y de todos ningunos le
        parecían tan bien como los que compuso el famoso Feliciano de Silva:
        porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
        parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
        cartas de desafío, donde en muchas partes hallaba escrito: la razón de
        la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
        que con razón me quejo de la vuestra fermosura, y también cuando leía:
        los altos cielos que de vuestra divinidad divinamente con las estrellas
        se fortifican, y os hacen merecedora del merecimiento que merece la
        vuestra grandeza.
      </Text>


      <Text style={styles.subtitle} break>
        Capítulo II: Que trata de la primera salida que de su tierra hizo el
        ingenioso Don Quijote
      </Text>
      
      <Text style={styles.text}>
        Hechas, pues, estas prevenciones, no quiso aguardar más tiempo a poner
        en efeto su pensamiento, apretándole a ello la falta que él pensaba que
        hacía en el mundo su tardanza, según eran los agravios que pensaba
        deshacer, tuertos que enderezar, sinrazones que emendar y abusos que
        mejorar y deudas que satisfacer. Y así, sin dar parte a persona alguna
        de su intención y sin que nadie le viese, una mañana, antes del día, que
        era uno de los calurosos del mes de Julio, se armó de todas sus armas,
        subió sobre Rocinante, puesta su mal compuesta celada, embrazó su
        adarga, tomó su lanza y por la puerta falsa de un corral salió al campo
        con grandísimo contento y alborozo de ver con cuánta facilidad había
        dado principio a su buen deseo. Mas apenas se vio en el campo cuando le
        asaltó un pensamiento terrible, y tal, que por poco le hiciera dejar la
        comenzada empresa; y fue que le vino a la memoria que no era armado
        caballero, y que, conforme a ley de caballería, ni podía ni debía tomar
        armas con ningún caballero; y puesto que lo fuera, había de llevar armas
        blancas, como novel caballero, sin empresa en el escudo, hasta que por
        su esfuerzo la ganase. Estos pensamientos le hicieron titubear en su
        propósito; mas pudiendo más su locura que otra razón alguna, propuso de
        hacerse armar caballero del primero que topase, a imitación de otros
        muchos que así lo hicieron, según él había leído en los libros que tal
        le tenían. En lo de las armas blancas, pensaba limpiarlas de manera, en
        teniendo lugar, que lo fuesen más que un arminio; y con esto se quietó18
        y prosiguió su camino, sin llevar otro que aquel que su caballo quería,
        creyendo que en aquello consistía la fuerza de las aventuras
      </Text>


      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
)
}
