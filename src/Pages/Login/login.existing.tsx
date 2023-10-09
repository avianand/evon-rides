import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Button, TextInput} from "react-native-paper";

type Props = NativeStackScreenProps<any, "Login existing">;
const LoginScreenForExistingUser = ({navigation}: Props) => {
  const [otp, setotp] = React.useState<string>("")

  const handleOtpSubmit = async () => {

  }
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Enter Otp</Text>
      <TextInput
        style={styles.enterPhoneInputBox}
        placeholder="Enter phone number"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={6}
        value={otp}
        onChangeText={(text: string) => {
          setotp(text.replace(/[^0-9]/g, ""));
        }}
      />
      <Button mode="contained" onPress={handleOtpSubmit}>
        Submit
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    fontWeight: "700"
  },
  enterPhoneInputBox: {}
  });
export default LoginScreenForExistingUser;
