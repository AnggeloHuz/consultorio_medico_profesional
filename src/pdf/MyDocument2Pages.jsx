import { Page, Text, View, Document, StyleSheet, Image  } from '@react-pdf/renderer';
import fondo from '../../public/logod.png'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
  },
  view: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 35,
    paddingVertical: 25,
    paddingTop: 30,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.1,
  },
  texto: {
    fontSize: 12,
    fontWeight: "semibold",
    lineHeight: 1.5,
    marginBottom: 10
  },
  table: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
    border: "1px solid black",
    marginTop: 2
  },
  tableRowBlack: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
    border: "1px solid black",
    backgroundColor: "#CCCCCC",
    marginTop: 2
  },
  tableRowTitulos: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
    backgroundColor: "#2c5282",
    color: "#FFFFFF",
    border: "1px solid black",
    fontWeight: "bold",
  },
  tableCellSmall: {
    flex: 0.75, // Ajusta el ancho de las celdas según tus necesidades
    padding: 3,
  },
  tableCellLarge: {
    flex: 2, // Ajusta el ancho de las celdas según tus necesidades
    padding: 3,
  },
  tableCellNormal: {
    flex: 1, // Ajusta el ancho de las celdas según tus necesidades
    padding: 3,
  },
  encabezado: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "medium",
    alignItems: "center",
    marginBottom: 30,
  },
  bordeDerecha: {
    borderRight: "1px solid black"
  },
  titulo: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center"
  }
});

function MyDocument2Pages({datos, datos2, enterprise, size}) {
    return (
      <Document>
        <Page object-fit="fill" style={styles.page} size={size ===  null ? "A4" : size}>
          <View style={styles.view}>
            <Image style={styles.image} src={fondo} alt="images" />
            <View style={styles.encabezado}>
              <Text>
                Dr. {enterprise.name_doc} {enterprise.lastname_doc}
              </Text>
              <Text>{enterprise.speciality_doc}</Text>
              <Text>{enterprise.name_enter}</Text>
              <Text>{enterprise.address_enter}</Text>
              <Text>
                {enterprise.phone_enter} - {enterprise.phone_doc} (personal)
              </Text>
              <Text>RIF {enterprise.rif_enter}</Text>
            </View>

            <View>
              {datos.map((text, key) => (
                <Text key={key} style={styles.texto}>
                  - {text}
                </Text>
              ))}
            </View>
          </View>
        </Page>

        <Page object-fit="fill" style={styles.page} size={size ===  null ? "A4" : size}>
          <View style={styles.view}>
            <Image style={styles.image} src={fondo} alt="images" />
            <View style={styles.encabezado}>
              <Text>
                Dr. {enterprise.name_doc} {enterprise.lastname_doc}
              </Text>
              <Text>{enterprise.speciality_doc}</Text>
              <Text>{enterprise.name_enter}</Text>
              <Text>{enterprise.address_enter}</Text>
              <Text>
                {enterprise.phone_enter} - {enterprise.phone_doc} (personal)
              </Text>
              <Text>RIF {enterprise.rif_enter}</Text>
            </View>

            <View>
              {datos2.map((text, key) => (
                <Text key={key} style={styles.texto}>
                  - {text}
                </Text>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
}

export default MyDocument2Pages;