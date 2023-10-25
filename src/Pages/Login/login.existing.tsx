import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {StatusBar} from "react-native";
import {StyleSheet, ScrollView, SafeAreaView} from "react-native";
import {Button, TextInput, Text} from "react-native-paper";

type Props = NativeStackScreenProps<any, "Login existing">;
const LoginScreenForExistingUser = ({navigation}: Props) => {
  const [otp, setotp] = React.useState<string>("");

  const handleOtpSubmit = async () => {
    // check if user otp is correct

    // navigate based on api response
    navigation.navigate("User Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text variant="displayLarge" style={styles.welcomeText}>
          Verification...
        </Text>
        <Text variant="bodySmall" style={styles.loginContinueText}>
          Please enter the otp received on your phone
        </Text>
        <TextInput
          style={styles.enterPhoneInputBox}
          placeholder="Enter Otp"
          textContentType="oneTimeCode"
          keyboardType="phone-pad"
          maxLength={6}
          value={otp}
          onChangeText={(text: string) => {
            setotp(text.replace(/[^0-9]/g, ""));
          }}
        />
        <Button
          style={styles.resendButton}
          labelStyle={{fontWeight: "600", fontSize: 18}}
          onPress={() => {}}
          mode="text">
          resend otp
        </Button>
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
        <Button
          style={styles.button}
          labelStyle={{fontWeight: "600", fontSize: 18}}
          onPress={handleOtpSubmit}
          mode="contained">
          Continue
        </Button>
        <Button
          style={styles.button}
          labelStyle={{fontWeight: "600", fontSize: 18}}
          onPress={() => navigation.goBack()}
          mode="outlined">
          Back
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  scrollView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 20
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700"
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 99,
    width: "100%"
  },
  loginContinueText: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 20
  },
  resendButton: {
    width: "100%",
    paddingVertical: 8,
    textDecorationLine: "underline"
  },
  enterPhoneInputBox: {
    marginBottom: 40,
    width: "100%",
    backgroundColor: "transparent"
  }
});
export default LoginScreenForExistingUser;
