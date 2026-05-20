import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function DashboardScreen({ navigation }) {

  const [username, setUsername] = useState("");

  const [totalHewan, setTotalHewan] = useState(0);
  const [totalSapi, setTotalSapi] = useState(0);
  const [totalKambing, setTotalKambing] = useState(0);
  const [totalDomba, setTotalDomba] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [jenisTerbanyak, setJenisTerbanyak] = useState("");
  const [hargaTermahal, setHargaTermahal] = useState(0);

  const formatPrice = (value) => {
    const number = Number(value) || 0;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
      getDashboard();
    }, [])
  );

  const getUser = async () => {

    const user =
      await AsyncStorage.getItem("username");

    setUsername(user);
  };

  const getDashboard = async () => {
    try {
      const response = await axios.get(
        "http://10.1.12.214:8080/api/hewans"
      );

      const items = response.data.data || [];
      setTotalHewan(items.length);

      let totalHargaValue = 0;
      let hargaTermahalValue = 0;
      const counts = {};

      items.forEach((item) => {
        const harga = Number(item.hargaHewan) || 0;
        totalHargaValue += harga; // logika nya total harga semua hewan ditambah dari harga hewan yang sedang di loop
        if (harga > hargaTermahalValue) {
          hargaTermahalValue = harga;
        }

        const jenis = item.jenisHewan || item.category || "";
        if (jenis) {
          counts[jenis] = (counts[jenis] || 0) + 1;
        }
      });

      setTotalHarga(totalHargaValue);
      setHargaTermahal(hargaTermahalValue);

      setTotalSapi(counts["Sapi"] || 0);
      setTotalKambing(counts["Kambing"] || 0);
      setTotalDomba(counts["Domba"] || 0);

      const mostFrequentJenis = Object.entries(counts).reduce(
        (best, [jenis, count]) =>
          count > best.count ? { jenis, count } : best,
        { jenis: "-", count: 0 }
      ).jenis;

      setJenisTerbanyak(mostFrequentJenis || "-");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Farm Apps 014
      </Text>

      {/* DASHBOARD */}

      <View style={styles.dashboardContainer}>

        <View style={styles.boxBlue}>
          <Text style={styles.boxNumber}>
            {totalHewan}
          </Text>

          <Text style={styles.boxText}>
            Total Hewan
          </Text>
        </View>

        <View style={styles.boxOrange}>
          <Text style={styles.boxNumber}>
            {totalSapi}
          </Text>

          <Text style={styles.boxText}>
            Sapi
          </Text>
        </View>

      </View>

      <View style={styles.dashboardContainer}>

        <View style={styles.boxPink}>
          <Text style={styles.boxNumber}>
            {totalKambing}
          </Text>

          <Text style={styles.boxText}>
            Kambing
          </Text>
        </View>

        <View style={styles.boxDarkBlue}>
          <Text style={styles.boxNumber}>
            {totalDomba}
          </Text>

          <Text style={styles.boxText}>
            Domba
          </Text>
        </View>

      </View>

      <View style={styles.dashboardContainer}>
        <View style={styles.boxGreen}>
          <Text style={styles.boxNumber}>
            Rp {formatPrice(totalHarga)}
          </Text>
          <Text style={styles.boxText}>
            Total Harga
          </Text>
        </View>

        <View style={styles.boxPurple}>
          <Text style={styles.boxNumber}>
            Rp {formatPrice(hargaTermahal)}
          </Text>
          <Text style={styles.boxText}>
            Harga Termahal
          </Text>
        </View>
      </View>

      <View style={styles.mostFrequentContainer}>
        <Text style={styles.mostFrequentTitle}>
          Jenis Terbanyak
        </Text>
        <Text style={styles.mostFrequentValue}>
          {jenisTerbanyak || "-"}
        </Text>
      </View>

      {/* CATEGORY BUTTON */}

      <TouchableOpacity
        style={styles.menu}
        onPress={() =>
          navigation.navigate("Sapi")
        }
      >
        <Text style={styles.menuText}>
          Sapi Category
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menu}
        onPress={() =>
          navigation.navigate("Kambing")
        }
      >
        <Text style={styles.menuText}>
          Kambing Category
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menu}
        onPress={() =>
          navigation.navigate("Domba")
        }
      >
        <Text style={styles.menuText}>
          Domba Category
        </Text>
      </TouchableOpacity>

      {/* ADD DATA */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("Detail")
        }
      >
        <Text style={{ color: "white" }}>
          + Add Data
        </Text>
      </TouchableOpacity>

      <Text style={styles.welcome}>
        Welcome {username}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 50,
  },

  dashboardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  boxBlue: {
    backgroundColor: "#4DA6FF",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  boxOrange: {
    backgroundColor: "#FF8C69",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  boxPink: {
    backgroundColor: "#FF69B4",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  boxDarkBlue: {
    backgroundColor: "#4169E1",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  boxGreen: {
    backgroundColor: "#FE9376",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  boxPurple: {
    backgroundColor: "#51A9FF",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  mostFrequentContainer: {
    backgroundColor: "#FE9276",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  mostFrequentTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    fontWeight: "bold",
  },

  mostFrequentValue: {
    fontSize: 18,
    color: "#111",
    fontWeight: "bold",
  },

  boxNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  boxText: {
    color: "white",
    marginTop: 5,
  },

  menu: {
    backgroundColor: "#ADD8E6",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  menuText: {
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#CAEEFB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  welcome: {
    textAlign: "center",
    marginTop: 25,
    fontStyle: "italic",
  },

});