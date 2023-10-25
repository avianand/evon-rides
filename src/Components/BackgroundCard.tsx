import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useTheme} from "react-native-paper";

// todo - remove any from all scenarios
const BackgroundCard = (props: any) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    defaultLocationCard: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 40,
      margin: 5,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.secondary,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4
    }
  });
  return (
    <SafeAreaView>
      <View style={[styles.defaultLocationCard, props.cardStyle]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};
BackgroundCard.propTypes = {};

BackgroundCard.defaultProps = {};

export default BackgroundCard;
