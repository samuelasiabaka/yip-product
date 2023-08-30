import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";

import Spinner from "react-native-loading-spinner-overlay";

// Import components
import Separator from "../components/Separator";
import ProductItem from "../components/ProductItem";

// Context
import { ProductContext } from "../context/ProductContext";

const Home = ({ navigation }) => {
  const { products, setProducts, loading, setLoading } =
    useContext(ProductContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          // textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            navigation.navigate("Add Product");
          }}
        >
          <Text style={styles.primaryBtnTxt}>Add New Product</Text>
        </TouchableOpacity>
      </View>

      <View>
        {products.length === 0 ? (
          <Text style={styles.noProductTxt}>
            Click the Add new product button to add product
          </Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => <ProductItem product={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  btnContainer: {
    marginBottom: 0,
  },
  primaryBtn: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#5DA3FA",
  },
  primaryBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  noProductTxt: {
    textAlign: "center",
    fontWeight: "700",
    color: "#5DA3FA",
    marginTop: "50%",
  },
});

export default Home;
