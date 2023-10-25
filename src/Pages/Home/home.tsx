import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet, View, StatusBar, ImageBackground} from "react-native";
import MapView from "react-native-maps";
import {Marker, Polyline} from "react-native-maps";
import * as Location from "expo-location";
import GetLocation from "react-native-get-location";
import axios from "axios";
import {useTheme} from "react-native-paper";
import BackgroundCard from "../../Components/BackgroundCard";
import LocationCard from "../../Components/LocationCard";
import GoogleAutocompleteInput from "../../Components/GoogleAutocompleteInput";

export type RootStackParamList = {
  Profile: undefined;
  Home: undefined;
  Login: undefined;
  Pickup: undefined;
  Booking: undefined;
  Destination: undefined;
  PickupTime: undefined;
  MapSection: undefined;
  Trip: undefined;
  AccountInfo: undefined;
  AccountInfoEdit: undefined;
  Help: undefined;
  Policy: undefined;
  Cancellation: undefined;
  Privacy: undefined;
  TnC: undefined;
  Signup: undefined;
};

const Home = () => {
  const theme = useTheme();
  const [markers, setMarkers] = useState([
    {
      latlng: {latitude: 37.78825, longitude: -122.4324}
    },
    {
      latlng: {latitude: 43.78825, longitude: -120.4324}
    }
  ]);
  const [destination, setDestination] = useState({
    lat: 0,
    lng: 0
  });
  const [source, setSource] = useState({
    lat: 0,
    lng: 0
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [sourceTaken, setSourceTaken] = useState(false);
  const [destinationTaken, setDestinationTaken] = useState(false);

  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      flex: 5,
      backgroundColor: "white",
      width: "100%"
    },
    container: {
      padding: 0,
      flex: 5
    },
    map: {
      width: "100%",
      height: "100%",
      position: "relative"
    },
    mapContainerBackground: {
      position: "relative"
    },
    upperContainer: {
      flex: 2,
      position: "relative"
    },
    mapContainer: {
      flex: 2,
      position: "relative"
    },
    mapInputContainer: {
      position: "absolute",
      width: "100%",
      marginTop: 50,
      paddingLeft: 15,
      paddingRight: 15
    },
    innerMapInputContainer: {
      justifyContent: "center"
    },
    lowerContainer: {
      marginTop: 30,
      flex: 3
    },
    inputContainer: {
      marginTop: 10
    },
    searchIcon: {
      zIndex: 2,
      position: "absolute",
      marginLeft: 15
    },
    destinationBox: {
      flexDirection: "row",
      alignContent: "center",
      textAlign: "center",
      alignItems: "center"
    },
    destinationText: {
      color: theme.colors.primary,
      alignSelf: "center"
    },
    destinationCard: {
      backgroundColor: theme.colors.background
    },
    cardContainer: {
      paddingLeft: 15,
      paddingRight: 15
    },
    text: {
      textAlign: "center",
      flex: 3
    },
    source: {
      color: "#000",
      width: "100%",
      borderWidth: 5,
      borderColor: "red "
    },
    addMargin: {
      marginTop: 30
    }
  });

  const handleDestination = (
    data: any,
    details: {
      geometry: {location: React.SetStateAction<{lat: number; lng: number}>};
    }
  ) => {
    if (details && details.geometry && details.geometry.location) {
      setDestination(details.geometry.location);
      setDestinationTaken(true);
      createPolyLine();
    }
  };

  const handleSource = (data: any, details: any) => {
    if (details && details.geometry && details.geometry.location) {
      setSource(details.geometry.location);
      setSourceTaken(true);
      createPolyLine();
    }
  };

  const createPolyLine = () => {
    axios
      .post(
        "https://routes.googleapis.com/directions/v2:computeRoutes?key=AIzaSyAoVTXJVlmv4-WekrQug6UQCjj3a5_WrzY",
        {
          origin: {
            location: {
              latLng: {
                latitude: source.lat,
                longitude: source.lng
              }
            }
          },
          destination: {
            location: {
              latLng: {
                latitude: destination.lat,
                longitude: destination.lng
              }
            }
          },
          travelMode: "DRIVE"
        },
        {
          headers: {
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
          }
        }
      )
      .then(function (response: any) {
        console.log("response", JSON.stringify(response));
      });
  };

  const checkGrantPermission = async () => {
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log("location ", location);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      setSource({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000
    })
      .then(location => {
        console.log("location", location);
        setMarkers([
          {
            latlng: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }
          },
          {
            latlng: {latitude: destination.lat, longitude: destination.lng}
          }
        ]);
        setSourceTaken(true);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
    setMarkers([
      {
        latlng: {latitude: source.lat, longitude: source.lng}
      },
      {
        latlng: {latitude: destination.lat, longitude: destination.lng}
      }
    ]);
  }, [source, destination]);

  useEffect(() => {
    checkGrantPermission();
  }, []);

  console.log("new destination", destination);
  console.log("new source", source);
  console.log("new markers", markers);
  console.log("currentLocation", currentLocation);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.mapContainer}>
            <ImageBackground source={""} style={styles.mapContainerBackground}>
              <MapView
                initialRegion={{
                  latitude: source.lat,
                  longitude: source.lng,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0221
                }}
                region={{
                  latitude: source.lat,
                  longitude: source.lng,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0221
                }}
                style={styles.map}>
                {markers.map((marker, index) => (
                  <Marker key={index} coordinate={marker.latlng} />
                ))}
                {sourceTaken && destinationTaken ? (
                  <Polyline
                    coordinates={[
                      {latitude: source.lat, longitude: source.lng},
                      {latitude: destination.lat, longitude: destination.lng}
                    ]}
                    strokeColor="#000"
                    strokeWidth={2}
                  />
                ) : null}
              </MapView>
            </ImageBackground>

            <View style={styles.mapInputContainer}>
              <View style={[styles.innerMapInputContainer, styles.addMargin]}>
                <GoogleAutocompleteInput
                  editable={true}
                  placeholder="Current Location"
                  style={styles.source}
                  onSelect={handleSource}
                  placeholderTextColor={"#000"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.cardContainer}>
            <BackgroundCard>
              <View style={styles.inputContainer}>
                <View style={styles.innerMapInputContainer}>
                  <GoogleAutocompleteInput
                    editable
                    placeholder="Destination"
                    onSelect={handleDestination}
                    placeholderTextColor={theme.colors.primary}
                  />
                </View>
              </View>
              <LocationCard
                mainText="Shivaji Nagar"
                subText="Shivaji Nagar, Pune"
              />
              <LocationCard
                mainText="Pimpri Chinchwad"
                subText="Pimpri Chinchwad, Pune"
              />
              <LocationCard
                mainText="Shivaji Nagar"
                subText="Shivaji Nagar, Pune"
              />
            </BackgroundCard>
          </View>
        </View>
      </View>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

Home.defaultProps = {
  navigation: {navigate: () => null}
};

export default Home;
