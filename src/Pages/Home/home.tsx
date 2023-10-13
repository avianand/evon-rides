import * as React from "react";
import {View} from "react-native";
import {Button, useTheme} from "react-native-paper";

type Props = {
  navigation: any;
};

const HomeScreenForExistingUser = ({navigation}: Props) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Button
        buttonColor="#000000"
        onPress={() => navigation.navigate("Login")}>
        Continue with phone number
      </Button>
    </View>
  );
};

export default HomeScreenForExistingUser;
