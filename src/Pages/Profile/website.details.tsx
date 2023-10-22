import * as React from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import {Divider, List} from "react-native-paper";
import CatSvg from "../../../assets/images/cat.svg";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

// import axios from "axios";

// const NOTIFY_ME_URL =
//   "http://localhost:8080/trip-management-service/getRideDetails/byRideId";
// const payload = {ride_id: "119d91a3-4f31-4b4e-a1cd-0b4559fb706c"};
// const payloadData = JSON.stringify(payload);
// axios
// .post(
//   NOTIFY_ME_URL,
//   {
//     // Request data or body
//     payloadData
//   },
//   {
//     headers: {
//       "Content-Type": "text/html" // Set the Content-Type header to 'text/html'
//       // Add any other headers you need
//     }
//   }
// )
// .then(response => {
//   SetNotifyMeContent(JSON.stringify(response));
// })
// .catch(error => {
//   SetNotifyMeContent(JSON.stringify(error));
//   console.error(error);
// });

const WebsiteDetails = () => {
  const listArr: string[] = ["List-1", "List-2"];
  const [expanded, setExpanded] = React.useState(true);

  const [isLoading, SetIsLoading] = React.useState(true);
  const [content, setContent] = React.useState<string[]>(listArr);

  const onHandlePress = () => {
    setExpanded(!expanded);
    if (expanded) {
      setTimeout(() => {
        setContent(listArr);
        SetIsLoading(false);
      }, 1000);
    } else {
      SetIsLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <CatSvg height={200} width={200} />
      </View>

      {/* Content Section */}

      <List.Section title="Accordions">
        <List.Accordion
          title="List"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={onHandlePress}>
          {isLoading ? (
            <View>
              <ShimmerPlaceHolder
                height={30}
                style={{width: "100%", marginBottom: 5}}
                LinearGradient={LinearGradient}
              />
              <ShimmerPlaceHolder
                height={30}
                style={{width: "100%", marginBottom: 5}}
                LinearGradient={LinearGradient}
              />
            </View>
          ) : (
            <View>
              {content.map((item, index) => (
                <List.Item title={item} key={index} />
              ))}
            </View>
          )}
        </List.Accordion>
      </List.Section>
      <Divider />

      <ScrollView>
        <Text style={{padding: 20, margin: 20}}>No Way</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1"
  }
});

export default WebsiteDetails;
