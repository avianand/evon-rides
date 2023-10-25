import React from "react";
import {SafeAreaView, StyleSheet, View, Image} from "react-native";
import {ViewStyle} from "react-native-phone-input";
import {useTheme} from "react-native-paper";
import Text from "./Text";

interface Props {
  cardStyle?: ViewStyle;
  mainTextCardStyle?: ViewStyle;
  subTextCardStyle?: ViewStyle;
  mainText: string;
  subText: string;
  icon?: string;
}

// todo - remove any and fix ts errors
const LocationCard = ({
  cardStyle,
  subText,
  mainText,
  mainTextCardStyle,
  subTextCardStyle,
  icon
}: Props) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    defaultLocationCard: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      flexDirection: "row",
      marginTop: 5,
      marginBottom: 5
    },
    locationCardMainText: {
      fontWeight: "600",
      fontSize: 12
    },
    locationCardSubText: {
      fontWeight: "400",
      fontSize: 12
    },
    image: {
      width: 25,
      height: 25,
      resizeMode: "contain",
      marginRight: 5
    },
    imageRight: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      alignSelf: "flex-end"
    },
    group: {
      flex: 0.5
    },
    text: {
      flex: 2.5
    },
    frameContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      flex: 1
    }
  });

  return (
    <SafeAreaView>
      <View style={[styles.defaultLocationCard, cardStyle]}>
        <View style={styles.group}>
          {/* //! todo - remove png */}
          {/* <Image
            source={
              icon == "home"
                ? require("../../../assets/images/clinic.png")
                : icon == "office"
                ? require("../../../assets/images/briefcase.png")
                : require("../../../assets/images/Group162.png")
            }
            style={styles.image}
          /> */}
        </View>
        <View style={styles.text}>
          <Text style={[styles.locationCardMainText, mainTextCardStyle]}>
            {mainText}
          </Text>
          <Text style={[styles.locationCardSubText, subTextCardStyle]}>
            {subText}
          </Text>
        </View>
        <View style={styles.frameContainer}>
          <Image
            source={require("../../../assets/images/Frame.png")}
            style={styles.imageRight}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
LocationCard.propTypes = {};

LocationCard.defaultProps = {};

export default LocationCard;
