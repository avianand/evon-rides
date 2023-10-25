import * as React from "react";
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {SubmitPhone} from "../../Api/authApis";
import {HttpStatusCode} from "axios";

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const [phoneNo, setphoneNo] = React.useState<string>("");

  const handleSubmitPhoneNumber = async () => {
    const response = await SubmitPhone(Number(phoneNo));
    console.log(
      "🚀 ~ file: login.tsx:14 ~ handleSubmitPhoneNumber ~ response:",
      response
    );
    if (response.status === HttpStatusCode.Ok) {
      if ((response.data.UserType = "login_new_user")) {
        navigation.navigate("Login new");
      } else {
        navigation.navigate("Login existing");
      }
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
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
        <TextInput
          style={styles.enterPhoneInputBox}
          left={<TextInput.Affix text="+91 " />}
          placeholder="Enter phone number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          autoFocus
          maxLength={10}
          value={phoneNo}
          onChangeText={(text: string) => {
            setphoneNo(text.replace(/[^0-9]/g, ""));
          }}
        />

        {/* Based on response from api display existing or new user login form */}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            labelStyle={{fontWeight: "600", fontSize: 18}}
            onPress={handleSubmitPhoneNumber}
            mode="contained">
            Continue
          </Button>
          <Button
            contentStyle={{width: "100%", padding: 4}}
            labelStyle={{fontWeight: "600", fontSize: 18}}
            onPress={() => navigation.navigate("Login new")}
            mode="contained">
            Login New user
          </Button>
          <Button
            contentStyle={{width: "100%", padding: 4}}
            labelStyle={{fontWeight: "600", fontSize: 18}}
            onPress={() => navigation.navigate("Login existing")}
            mode="contained">
            Login existing user
          </Button>
          <View style={styles.space} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    fontWeight: "700"
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
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
  },
  space: {
    width: 10, // or whatever size you need
    height: 10
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 99,
    width: "100%"
  }
});

export default LoginScreen;
