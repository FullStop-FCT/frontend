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

    return(
        <Document>
          <Page size="A4" style={styles.body}>

            <Image src="https://i.postimg.cc/13HpmLvJ/output-onlinepngtools-1.png" />

            <Text style={styles.title}>Certificado de Voluntariado</Text>
            
            {props.activities.map((activity, index) => 

                <div key={index}>
                  <Text style={styles.subtitle}>
                    {activity.title}
                  </Text>
                  <Text style={styles.text}>
                    desc...
                  </Text>
                </div>
              
            )}


            <Image style={styles.signature} src="https://i.postimg.cc/bJgqB9gC/signature.png" />
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
          </Page>
        </Document>
)
}
