import * as React from "react";
import {StyleSheet, View, ScrollView, SafeAreaView} from "react-native";
import {Button, useTheme} from "react-native-paper";
import Text from "../../Components/Text";
import Logo from "../../../assets/images/logo.svg";
import HeroImage from "../../../assets/images/heroImage.svg";
import {StatusBar} from "react-native";

type Props = {
  navigation: any;
};

const HomeScreenForGuestUser = ({navigation}: Props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight
    },
    logo: {
      width: 66,
      height: 58
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 99,
      width: "100%"
    },
    buttonContainer: {
      width: "86%"
    },
    sloganText: {
      fontWeight: "700",
      paddingHorizontal: 27,
      textAlign: "center"
    },
    hyperLinktext: {
      color: theme.colors.primary,
      textDecorationLine: "underline",
      textDecorationColor: theme.colors.primary,
      marginHorizontal: 2
    },
    termsAndPrivacyTextBox: {
      marginTop: 20,
      paddingHorizontal: 15,
      fontSize: 10
    },
    carbonEmissionText: {
      fontWeight: "700",
      color: "white"
    },
    carbonEmissionBox: {
      alignItems: "center",
      backgroundColor: theme.colors.tertiary,
      paddingHorizontal: 25,
      paddingVertical: 20,
      borderRadius: 20,
      position: "relative",
      marginBottom: 30
    },
    savedTillText: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 2,
      position: "absolute",
      bottom: -14
    }
  });
  const today = new Date();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20
            }}>
            <Logo height={40} width={40} />
            <Text
              variant="labelLarge"
              style={{
                fontWeight: "600"
              }}>
              Swiro
            </Text>
          </View>
          <View style={styles.carbonEmissionBox}>
            <Text variant="displaySmall" style={styles.carbonEmissionText}>
              1200+
            </Text>
            <Text
              variant="labelLarge"
              style={{
                fontSize: 14,
                ...styles.carbonEmissionText,
                marginTop: 10,
                marginBottom: 2
              }}>
              Tonnes of CO2 saved
            </Text>
            <View style={styles.savedTillText}>
              <Text
                variant="labelLarge"
                style={{fontSize: 10, fontWeight: "700"}}>
                Saved till{" "}
                {today.toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric"
                })}
              </Text>
            </View>
          </View>
          <HeroImage />
        </View>
        <View style={{alignItems: "center"}}>
          <Text
            variant="labelLarge"
            style={{
              fontSize: 22,
              lineHeight: 28,
              ...styles.sloganText
            }}>
            Explore a new way to travel with Swiro
          </Text>
          <Text
            variant="labelSmall"
            style={{
              fontSize: 16,
              ...styles.sloganText,
              marginVertical: 22
            }}>
            Electric. Effortless.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            buttonColor="black"
            style={styles.button}
            labelStyle={{
              fontSize: 16,
              fontWeight: "700"
            }}
            onPress={() => navigation.navigate("Login")}>
            Continue with Phone number
          </Button>
        </View>
        <View style={styles.termsAndPrivacyTextBox}>
          <Text variant="bodySmall" style={styles.termsAndPrivacyTextBox}>
            By continuing you agree that you have read and accepted Swiro's{" "}
            <Text
              onPress={() => navigation.navigate("")}
              style={styles.hyperLinktext}>
              Terms of Use
            </Text>{" "}
            and <Text style={styles.hyperLinktext}>Privacy Policy.</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreenForGuestUser;
