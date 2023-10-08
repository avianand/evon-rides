import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from 'react';
import { View, Text, Button } from 'react-native';


type Props = NativeStackScreenProps<any, "Login existing">;
const LoginScreenForExistingUser = ({ navigation }: Props) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Continue with phone number</Text>
        <Button
        title="Conitnue with phone number"
        onPress={() => navigation.navigate('Details')}
      />
      </View>
    );
  }
  

  export default LoginScreenForExistingUser