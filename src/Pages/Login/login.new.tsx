import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {Button, Text, TextInput} from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import {useController, useForm} from "react-hook-form";

type Props = NativeStackScreenProps<any, "Login new">;

const Input = ({
  name,
  control,
  placeholder
}: {
  name: string;
  // todo remove any from here
  control: any;
  placeholder?: string;
}) => {
  const {field} = useController({
    control,
    defaultValue: "",
    name
  });
  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      style={styles.input}
      placeholder={placeholder}
    />
  );
};

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
      email: "",
      otp: ""
    }
  });

  const handleSubmitPhoneNumber = async (data: any) => {
    console.log(
      "🚀 ~ file: login.new.tsx:50 ~ handleSubmitPhoneNumber ~ data:",
      data
    );
    // const response = await SubmitPhone(phoneNo);
    console.log(
      "🚀 ~ file: login.tsx:14 ~ handleSubmitPhoneNumber ~ response:"
    );
    navigation.navigate("Profile new");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text variant="displayLarge" style={styles.welcomeText}>
          One more step...
        </Text>
        <Text variant="headlineMedium" style={styles.loginContinueText}>
          Please fill the details to continue
        </Text>
        <Input
          name="firstName"
          placeholder="Enter first name"
          control={control}
        />
        <Input
          name="lastName"
          placeholder="Enter last name"
          control={control}
        />
        <Input name="city" placeholder="Enter city" control={control} />
        <Input
          name="email"
          placeholder="Enter email (optional)"
          control={control}
        />
        <Input name="otp" placeholder="Enter otp" control={control} />
        <Button
          style={styles.resendButton}
          labelStyle={{fontWeight: "600", fontSize: 18}}
          onPress={handleSubmit(handleSubmitPhoneNumber)}
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
          onPress={handleSubmit(handleSubmitPhoneNumber)}
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "700"
  },
  scrollView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 20
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
  input: {
    backgroundColor: "none",
    width: "100%",
    marginVertical: 12
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 99,
    width: "100%"
  },
  resendButton: {
    width: "100%",
    paddingVertical: 8,
    textDecorationLine: "underline"
  }
});

export default LoginScreenForNewUser;
