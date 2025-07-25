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

function MyDocument({titulo, datos, tipo, enterprise, size}) {
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
            {tipo === "texto" ? (
              <View>
                {datos.map((text, key) => (
                  <Text key={key} style={styles.texto}>- {text}</Text>
                ))}
              </View>
            ) : tipo === "array" ? (
              <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <View style={styles.table}>
                  <View style={styles.tableRowTitulos}>
                    <View style={[styles.tableCellLarge, styles.bordeDerecha]}>
                      <Text>Nombre y Apllido</Text>
                    </View>
                    <View style={[styles.tableCellNormal, styles.bordeDerecha]}>
                      <Text>Método de Pago</Text>
                    </View>
                    <View style={[styles.tableCellNormal, styles.bordeDerecha]}>
                      <Text>Estatus</Text>
                    </View>
                    <View style={[styles.tableCellSmall, styles.bordeDerecha]}>
                      <Text>Fecha</Text>
                    </View>
                    <View style={[styles.tableCellSmall, styles.bordeDerecha]}>
                      <Text>Bolívares</Text>
                    </View>
                    <View style={styles.tableCellSmall}>
                      <Text>Dolares</Text>
                    </View>
                  </View>
                  {datos.map((row, index) => (
                    <View
                      key={index}
                      style={
                        index % 2 === 0 ? styles.tableRowBlack : styles.tableRow
                      }
                    >
                      <View
                        style={[styles.tableCellLarge, styles.bordeDerecha]}
                      >
                        <Text>{row.name_patient}</Text>
                      </View>
                      <View
                        style={[styles.tableCellNormal, styles.bordeDerecha]}
                      >
                        <Text>{row.metodo_con}</Text>
                      </View>
                      <View
                        style={[styles.tableCellNormal, styles.bordeDerecha]}
                      >
                        <Text>{row.estado_con}</Text>
                      </View>
                      <View
                        style={[styles.tableCellSmall, styles.bordeDerecha]}
                      >
                        <Text>{row.fecha_con}</Text>
                      </View>
                      <View
                        style={[styles.tableCellSmall, styles.bordeDerecha]}
                      >
                        <Text>Bs {row.bolivares_con}</Text>
                      </View>
                      <View style={styles.tableCellSmall}>
                        <Text>$ {row.dolares_con}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <View style={styles.table}>
                  <View style={styles.tableRowTitulos}>
                    <View style={[styles.tableCellLarge, styles.bordeDerecha]}>
                      <Text>Nombre y Apllido</Text>
                    </View>
                    <View style={[styles.tableCellNormal, styles.bordeDerecha]}>
                      <Text>Teléfono</Text>
                    </View>
                    <View style={[styles.tableCellSmall, styles.bordeDerecha]}>
                      <Text>Cédula</Text>
                    </View>
                    <View style={[styles.tableCellSmall, styles.bordeDerecha]}>
                      <Text>Fecha de la Cita</Text>
                    </View>
                    <View style={styles.tableCellSmall}>
                      <Text>Asistió a la Cita</Text>
                    </View>
                  </View>
                  {datos.map((row, index) => (
                    <View
                      key={index}
                      style={
                        index % 2 === 0 ? styles.tableRowBlack : styles.tableRow
                      }
                    >
                      <View
                        style={[styles.tableCellLarge, styles.bordeDerecha]}
                      >
                        <Text>{row.name_patient}</Text>
                      </View>
                      <View
                        style={[styles.tableCellNormal, styles.bordeDerecha]}
                      >
                        <Text>{row.phone_patient}</Text>
                      </View>
                      <View
                        style={[styles.tableCellSmall, styles.bordeDerecha]}
                      >
                        <Text>{row.ci_patient}</Text>
                      </View>
                      <View
                        style={[styles.tableCellSmall, styles.bordeDerecha]}
                      >
                        <Text>{row.date_quote.split("T")[0]}</Text>
                      </View>
                      <View style={styles.tableCellSmall}>
                        <Text>
                          {row.vino_quote === 0 ? "No vino" : "Si vino"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
}

export default MyDocument;