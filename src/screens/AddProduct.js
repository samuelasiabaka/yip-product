import React, { useState, useEffect, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Spinner from "react-native-loading-spinner-overlay";

// Context
import { ProductContext } from "../context/ProductContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddProduct() {
  const { products, setProducts, loading, setLoading } =
    useContext(ProductContext);

  // uuid instace
  const uuid = uuidv4();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setLoading(false);
  };

  //   upload to firebase
  const handleUpload = async () => {
    if (!productName || !productPrice || !image) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (products?.length >= 5) {
      Alert.alert("Maximum upload products added");
      setProductName("");
      setProductPrice("");
      setImage(null);
      return;
    }
    setLoading(true);

    // Test code
    const storage = getStorage();
    const imgRef = ref(storage, `productImages/${productName}`);

    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(imgRef, bytes);
    const imageUrl = await getDownloadURL(imgRef);

    const data = {
      id: uuid,
      name: productName,
      price: productPrice,
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
    };

    try {
      const dbRef = collection(db, "products");
      await addDoc(dbRef, data);

      console.log("Document written with ID: ", dbRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    Alert.alert("Success", "Product uploaded successfully");
    setProductName("");
    setProductPrice("");
    setImage(null);
    setLoading(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          // textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.title}>
          <Text style={styles.titleTxt}>Add a New Product</Text>
        </View>
        <View style={styles.imgContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <TouchableOpacity style={styles.imgBtn} onPress={pickImage}>
            <Text style={styles.primaryBtnTxt}>Select Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleUpload}>
            <Text style={styles.primaryBtnTxt}>Upload Product</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.noProduct}>
        <Text>Number of product(s): {products?.length}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  title: {},
  titleTxt: {
    fontSize: 40,
  },
  imgContainer: {
    marginVertical: 20,
    gap: 10,
  },
  imgBtn: {
    width: "auto",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#5DA3FA",
  },
  inputContainer: {
    alignItems: "center",
    gap: 10,
  },
  input: {
    padding: 8,
    marginTop: 10,
    height: 50,
    minWidth: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#5DA3FA",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  primaryBtn: {
    width: "40%",
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
  noProduct: {
    alignItems: "center",
    marginTop: "90%",
  },
});
