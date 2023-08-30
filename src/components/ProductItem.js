import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { db, doc, deleteDoc } from "../../firebase";

import Spinner from "react-native-loading-spinner-overlay";

import { ProductContext } from "../context/ProductContext";

const ProductItem = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, setLoading } = useContext(ProductContext);

  // Delete product
  const handleDelete = () => {
    setModalVisible(!modalVisible);
    const docRef = doc(db, "products", product.id);

    setLoading(true);

    deleteDoc(docRef)
      .then(() => {
        setLoading(false);
        Alert.alert("Successfuly Deleted Product");
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.name}>
              Are you sure you want to delete product?
            </Text>
            <View style={styles.confirmBtn}>
              <Pressable style={[styles.primaryBtn]} onPress={handleDelete}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.primaryBtn]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal ends */}
      <View>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.name}>{product.name}</Text>

        <View style={[styles.rowContainer, styles.priceContainer]}>
          <Text style={styles.discountPrice}>
            ₦{product?.price?.toLocaleString()}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.primaryBtnTxt}>Delete Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  modalView: {
    gap: 10,
    marginHorizontal: 20,
    marginTop: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 150,
    resizeMode: "contain",

    marginRight: 12,
  },
  name: {
    marginBottom: 4,

    fontSize: 15,
    fontWeight: "500",
  },
  ratingContainer: {
    marginBottom: 8,
  },
  priceContainer: {
    marginBottom: 12,
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
  buttonClose: {
    backgroundColor: "#5DA3FA",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  confirmBtn: {
    flexDirection: "row",
  },
});

export default ProductItem;
