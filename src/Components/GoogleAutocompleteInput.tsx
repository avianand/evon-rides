import React, {ReactNode} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextStyle,
  ViewStyle
} from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {useTheme} from "react-native-paper";

interface Props {
  editable?: boolean;
  children?: ReactNode;
  style?: TextStyle;
  onSelect: (
    data: any,
    details: {
      geometry: {location: React.SetStateAction<{lat: number; lng: number}>};
    }
  ) => void;
  placeholder: string;
  placeholderTextColor?: string;
  inputStyle?: ViewStyle;
}
// todo - remove any
const GoogleAutocompleteInput = (props: Props) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    focusedInput: {
      borderColor: theme.colors.primary
    },
    input: {
      borderWidth: 2,
      borderRadius: 50,
      fontSize: 14,
      color: theme.colors.secondary,
      borderColor: theme.colors.primary,
      flex: 1,
      paddingRight: 10,
      alignItems: "center",
      paddingLeft: 25
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative"
    },
    placeholder: {
      marginLeft: 50
    },
    icon: {
      position: "absolute",
      zIndex: 2,
      justifyContent: "center",
      marginTop: 10,
      marginLeft: 10
    }
  });

  const handleChange = (data: any, details: any) => {
    props.onSelect(data, details);
  };

  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder={props.placeholder}
          GooglePlacesDetailsQuery={{fields: "geometry"}}
          fetchDetails={true}
          enableHighAccuracyLocation={true}
          currentLocation={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={{
            rankby: "distance"
          }}
          textInputProps={{
            placeholderTextColor: props.placeholderTextColor,
            textAlign: "center"
          }}
          onPress={(data: any, details = null) => {
            // 'details' is provided when fetchDetails = true
            handleChange(data, details);
          }}
          styles={{textInput: [styles.input, props.inputStyle]}}
          query={{
            key: "AIzaSyAoVTXJVlmv4-WekrQug6UQCjj3a5_WrzY",
            language: "en"
          }}
          // todo - add svg image
          //   renderLeftButton={() => (
          //     <Image
          //       source={require("../../../assets/images/search1.png")}
          //       style={styles.icon}
          //     />
          //   )}
        />
      </View>
    </SafeAreaView>
  );
};
GoogleAutocompleteInput.propTypes = {};

GoogleAutocompleteInput.defaultProps = {};

export default GoogleAutocompleteInput;
