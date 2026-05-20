import React, {  useState, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import axios from "axios";

export default function KambingScreen({ navigation }) {

  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {

    const response = await axios.get(
      "http://10.1.12.214:8080/api/hewans/category/Kambing"
    );

    setData(response.data.data);
    orderBy(response.data.data, "hargaHewan", "desc");
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.navigate("Dashboard")}
    >
      <Text style={{ color: "white" }}>
        Kembali
      </Text>
    </TouchableOpacity>

    <Text style={styles.title}>
      Kambing Category
    </Text>

      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.idHewan.toString()
        }
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Detail", {
                item,
              })
            }
          >

            <Text style={styles.name}>
              {item.pemilikHewan}
            </Text>

            <Text>
              {item.kandangHewan}
            </Text>

            <Text>
              Rp {item.hargaHewan}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  backButton: {
  backgroundColor: "#4169E1",
  padding: 10,
  borderRadius: 8,
  width: 100,
  alignItems: "center",
  marginBottom: 20,
},
});