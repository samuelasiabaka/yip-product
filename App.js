import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import AddProduct from "./src/screens/AddProduct";
import Home from "./src/screens/Home";

// import context
import { ProductProvider } from "./src/context/ProductContext";

// Initialize Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Products",
            }}
          />
          <Stack.Screen
            name="Add Product"
            component={AddProduct}
            options={{
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({});
