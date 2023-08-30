import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useContext } from "react";

// Import components
import Separator from "../components/Separator";
import ProductItem from "../components/ProductItem";

// Context
import { ProductContext } from "../context/ProductContext";

const Home = ({ navigation }) => {
  const { products, setProducts, loading, setLoading } =
    useContext(ProductContext);

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Add Product"
        onPress={() => {
          navigation.navigate("Add Product");
        }}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});

export default Home;
