import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as React from "react";
import {View, StyleSheet} from "react-native";
import {
  Avatar,
  Text,
  Title,
  Subheading,
  TextInput,
  Button
} from "react-native-paper";

// type Props = NativeStackScreenProps<any, "Profile new">;
const ProfileNewForUser = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [name, setName] = React.useState("Vikash Kumar");
  const [phone, setPhone] = React.useState("(123) 456-7890");
  const [email, setEmail] = React.useState("johndoe@example.com");
  const [address, setAddress] = React.useState(
    "F-202, Tower-9, Unit-B, Blueridge Township, Hinjewadi, Pune-411057"
  );

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <View style={styles.container}>
      {/* User Logo and Name */}
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={require("../../../assets/images/avatar.png")}
        />
        {isEditMode ? (
          <TextInput
            style={styles.userName}
            value={name}
            onChangeText={text => setName(text)}
          />
        ) : (
          <Title style={[styles.userName, styles.textWhite]}>{name}</Title>
        )}
      </View>

      {/* User Details */}
      <View style={[styles.details, {padding: 20}]}>
        {/* Phone Section */}
        <View style={styles.detailItem}>
          <Subheading style={styles.label}>Phone:</Subheading>

          {isEditMode ? (
            <TextInput
              value={phone}
              style={styles.input}
              onChangeText={text => setPhone(text)}
            />
          ) : (
            <Text style={styles.info}>{phone}</Text>
          )}
        </View>

        {/* Email Section */}
        <View style={styles.detailItem}>
          <Subheading style={styles.label}>Email:</Subheading>

          {isEditMode ? (
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={text => setEmail(text)}
            />
          ) : (
            <Text style={styles.info}>{email}</Text>
          )}
        </View>

        {/* Address Section */}
        <View style={styles.detailItem}>
          <Subheading style={styles.label}>Address:</Subheading>

          {isEditMode ? (
            <TextInput
              value={address}
              style={styles.input}
              multiline
              numberOfLines={4} // Set the number of visible lines
              onChangeText={text => setAddress(text)}
            />
          ) : (
            <Text style={styles.info}>{address}</Text>
          )}
        </View>
      </View>

      <Button
        style={styles.editButtonPosition}
        mode="contained"
        onPress={handleEdit}>
        {isEditMode ? "Save" : "Edit"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: "#fff"
  },
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 20,
    height: "30%",
    backgroundColor: "#124f63"
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
