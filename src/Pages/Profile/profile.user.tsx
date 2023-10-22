// import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import Logo from "../../../assets/images/svg.svg";
// import Gif from "../../../assets/images/animated.gif";
import {Avatar, Title, Card, IconButton, Divider} from "react-native-paper";
// import SvgUri from "react-native-svg-uri";
type Props = {
  navigation: any;
};

// type Props = NativeStackScreenProps<any, "Profile new">;
const ProfileNewForUser = ({navigation}: Props) => {
  const data = {
    name: "Vikash Kumar",
    phone: 8002260006,
    emergencyPhone: 911006969,
    email: "vik@evon.com",
    address:
      "F-202, Tower-9, Unit-B, Blueridge Township, Hinjewadi, Pune-411057"
  };

  return (
    <View style={styles.container}>
      {/* User Logo and Name */}
      <View style={styles.header}>
        {/* <IconButton size={80} iconColor="white" icon="cogs" /> */}
        {/* <Image style={{height: "100%", width: 200}} source={Gif} alt="App Logo" /> */}
        {/* <SvgUri width="200" height="200" source={{uri: Logo}} /> */}
        <Logo height={100} width={100} />
        {/* <Title style={[styles.userName, styles.textBlue]}>GoRides</Title> */}
      </View>

      <ScrollView style={styles.scrollableContent}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title={data.phone}
            subtitle={data.email}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => <Avatar.Icon {...propsComp} icon="account" />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton {...propsComp} icon="chevron-right" />
            )}
          />
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity
          onPress={() => navigation.navigate("Website details")}>
          <Card.Title
            title="Website details"
            subtitle="notify-me"
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => <Avatar.Icon {...propsComp} icon="account" />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton {...propsComp} icon="chevron-right" />
            )}
          />
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title="Favourite Location"
            subtitle="home/work"
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => <Avatar.Icon {...propsComp} icon="map" />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton
                {...propsComp}
                icon="chevron-right"
                onPress={() => navigation.navigate("Profile new")}
              />
            )}
          />
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title="Emergency Contacts"
            subtitle={data.emergencyPhone}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => (
              <Avatar.Icon {...propsComp} icon="phone-alert" />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton
                {...propsComp}
                icon="chevron-right"
                onPress={() => navigation.navigate("Profile new")}
              />
            )}
          />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title="Ride Settings"
            subtitle="schedule"
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => <Avatar.Icon {...propsComp} icon="cog" />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton
                {...propsComp}
                icon="chevron-right"
                onPress={() => navigation.navigate("Profile new")}
              />
            )}
          />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title="Payments Settings"
            subtitle="UPI"
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => (
              <Avatar.Icon {...propsComp} icon="credit-card" />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => (
              <IconButton
                {...propsComp}
                icon="chevron-right"
                onPress={() => navigation.navigate("Profile new")}
              />
            )}
          />
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("Profile new")}>
          <Card.Title
            title="Logout"
            subtitle="Logout from Account"
            // eslint-disable-next-line react/no-unstable-nested-components
            left={propsComp => <Avatar.Icon {...propsComp} icon="logout" />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={propsComp => <IconButton {...propsComp} icon="" />}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 20
  },
  scrollableView: {
    flex: 1
  },
  scrollableContent: {
    flex: 1,
    marginBottom: 20
  },
  textWhite: {
    color: "#fff"
  },
  textBlue: {
    color: "#000"
  },
  container: {
    flex: 1
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1"
  },
  userName: {
    marginTop: 10,
    fontSize: 24
  },
  details: {
    marginTop: 20
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  label: {
    flex: 1,
    fontSize: 18
  },
  info: {
    flex: 1,
    fontSize: 16
  },
  input: {
    flex: 2 // Takes up 2/3 of the available space
  },
  editButtonPosition: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: "100%"
  }
});

export default ProfileNewForUser;
