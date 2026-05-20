import React, { useState, } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import axios from "axios";

export default function DetailScreen({
  route,
  navigation,
}) {

  const item = route.params?.item;

  const [pemilik, setPemilikHewan] =
    useState(item?.pemilikHewan || "");

    const [jenis, setJenisHewan] =
    useState(item?.jenisHewan || "");

  const [kandang, setKandangHewan] =
    useState(item?.kandangHewan || "");

  const [berat, setBerat] =
    useState(item?.beratHewan?.toString() || "");

  const [harga, setHargaHewan] =
    useState(item?.hargaHewan?.toString() || "");

  const addData = async () => {

    await axios.post(
      "http://10.1.12.214:8080/api/hewans",
      {
        pemilikHewan: pemilik,
        jenisHewan: jenis,
        kandangHewan: kandang,
        beratHewan: parseFloat(berat),
        hargaHewan: parseFloat(harga),
      }
    );

    alert("Berhasil tambah data");

    navigation.goBack();
  };

  const deleteData = async () => {

    await axios.delete(
      `http://10.1.12.214:8080/api/hewans/${item.idHewan}`
    );

    alert("Berhasil delete");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <Text>Pemilik Hewan</Text>

      <TextInput
        style={styles.input}
        value={pemilik}
        onChangeText={setPemilikHewan}
      />

      <Text>Jenis Hewan</Text>

      <TextInput
        style={styles.input}
        value={jenis}
        onChangeText={setJenisHewan}
      />

      <Text>Kandang</Text>

      <TextInput
        style={styles.input}
        value={kandang}
        onChangeText={setKandangHewan}
      />

      <Text>Berat</Text>

      <TextInput
        style={styles.input}
        value={berat}
        onChangeText={setBerat}
      />

      <Text>Harga Rp</Text>

      <TextInput
        style={styles.input}
        value={harga}
        onChangeText={setHargaHewan}
      />

      {!item ? (

        <TouchableOpacity
          style={styles.addButton}
          onPress={addData}
        >
          <Text style={{ color: "white" }}>
            + Add Data
          </Text>
        </TouchableOpacity>

      ) : (

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteData}
        >
          <Text style={{ color: "white" }}>
            Delete
          </Text>
        </TouchableOpacity>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: "#87CEFA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

});