import { BottomNavigation } from '@material-ui/core';
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
      fontFamily: 'Oswald',
      marginBottom: 20,
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
    sub_subtitle: {
      fontSize: 15,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      fontSize: 14,
      margin: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    presentation: {
      margin: 12,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      marginBottom: 40,
    },
    presentation_final: {
      margin: 12,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      marginTop: 50,
    },
    image: {
      marginHorizontal: 300,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    signature: {
      position: 'absolute',
      height: 100,
      bottom: 80,
      right:0,
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

  //console.log(props.activities);
  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hora(s) e " + rminutes + " minuto(s)";
  }

  let total = 0;

  function sum(time) {
    total += time;
  }

    return(
        <Document>
          <Page size="A4" style={styles.body}>

            <Image src="https://i.postimg.cc/13HpmLvJ/output-onlinepngtools-1.png" />

            <Text style={styles.title}>Certificado de Voluntariado</Text>
            <Text />

            <Text style={styles.presentation}>A Helping XPerience reconhece {props.user_name} pela sua contribuição nas seguintes atividades sociais:</Text>
            
            {props.activities.map((activity, index) => 

                
                <div key={index}>
                  <Text style={styles.subtitle}>
                    {activity.activityOwner}
                  </Text>
                  <Text style={styles.sub_subtitle}>
                    {activity.title}
                  </Text>
                  <Text style={styles.text}>
                    {"Duração: " + timeConvert(activity.activityTime)}
                    {sum(activity.activityTime)}
                  </Text>
                </div>
              
            )}

            <Text/>
            <Text/>
            <Text style={styles.presentation_final}> Totalizando {timeConvert(total)} de voluntariado durante o seu tempo registado(a) na nossa plataforma. </Text>

            <Image style={styles.signature} src="https://i.postimg.cc/bJgqB9gC/signature.png" />
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
          </Page>
        </Document>
)
}
