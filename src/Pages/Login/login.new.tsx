import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {Button, Text, TextInput} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {useForm} from "react-hook-form";

type Props = NativeStackScreenProps<any, "Login new">;

const LoginScreenForNewUser = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      email: ""
    }
  });

  const handleSubmitPhoneNumber = async () => {
    // const response = await SubmitPhone(phoneNo);
    console.log(
      "🚀 ~ file: login.tsx:14 ~ handleSubmitPhoneNumber ~ response:"
    );
    navigation.navigate("Profile new");
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.welcomeText}>
        Welcome,
      </Text>
      <Text variant="headlineMedium" style={styles.loginContinueText}>
        Log in to continue
      </Text>
      <Text variant="titleSmall" style={styles.enterPhoneLabel}>
        Enter phone number for verification
      </Text>
      {/* <TextInput
        style={styles.enterPhoneInputBox}
        placeholder="Enter phone number"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNo}
        onChangeText={(text: string) => {
          setphoneNo(text.replace(/[^0-9]/g, ""));
        }}
      /> */}

      {/* Based on response from api display existing or new user login form */}
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={{width: "100%", padding: 4}}
          labelStyle={{fontWeight: "600", fontSize: 18}}
          onPress={handleSubmitPhoneNumber}
          mode="contained">
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    fontWeight: "700"
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20
  },
  loginContinueText: {
    fontSize: 20,
    fontWeight: "700"
  },
  enterPhoneLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 20
  },
  enterPhoneInputBox: {
    width: "100%",
    marginVertical: 50,
    backgroundColor: "none"
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: 100
  }
});

export default LoginScreenForNewUser;
