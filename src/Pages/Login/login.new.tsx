import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {Button, Text, TextInput} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {Control, FieldValues, useController, useForm} from "react-hook-form";

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
    // const response = await SubmitPhone(phoneNo);
    console.log(
      "🚀 ~ file: login.tsx:14 ~ handleSubmitPhoneNumber ~ response:",
      data
    );
  };

  return (
    <View style={styles.container}>
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
      <Input name="lastName" placeholder="Enter last name" control={control} />
      <Input name="city" placeholder="Enter city" control={control} />
      <Input
        name="email"
        placeholder="Enter email (optional)"
        control={control}
      />
      <Input name="otp" placeholder="Enter otp" control={control} />
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
          onPress={handleSubmit(handleSubmitPhoneNumber)}
          mode="contained">
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
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
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 30
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
  }
});

export default LoginScreenForNewUser;
