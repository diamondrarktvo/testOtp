import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import {
  checkIfHasSMSPermission,
  requestReadSMSPermission,
  startReadSMS,
} from "@maniac-tech/react-native-expo-read-sms";
import { useEffect, useState } from "react";

export default function App() {
  const [appState, setAppState] = useState(null);
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(null);
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState(null);
  const [smsMessageData, setSmsMessageData] = useState(null);
  const [smsMessageNumber, setSmsMessageNumber] = useState(null);
  const [smsMessageBody, setSmsMessageBody] = useState(null);
  const [otp, setOtp] = useState(null);
  const [isUserStartedReadingSMS, setIsUserStartedReadingSMS] = useState(false);

  const buttonClickHandler = () => {
    setIsUserStartedReadingSMS(true);
    startReadSMS(callbackSuccess, callbackError);
  };

  const checkPermissions = async () => {
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );

    setHasReceiveSMSPermission(customHasReceiveSMSPermission);
    setHasReadSMSPermission(customHasReadSMSPermission);
    setAppState("Permission check complete");
    if (!customHasReceiveSMSPermission || !customHasReadSMSPermission) {
      requestReadSMSPermission();
    }
  };

  const callbackSuccess = (status, sms, error) => {
    console.log("sms :", sms);

    if (status === "success") {
      setSmsMessageData(sms);
    } else {
      Alert.alert("Error in callbackSuccès", JSON.stringify(error));
    }
  };

  const callbackError = (status, sms, error) => {
    Alert.alert("Error in callbackError", JSON.stringify(error));
  };

  useEffect(() => {
    const tempArray = smsMessageData
      ?.substring("1", smsMessageData.length - 1)
      .split(",");

    if (smsMessageData) {
      const messageOriginatingAdd = tempArray[0];
      const messageBody = tempArray[1];
      const otp = messageBody.split(":")[1];

      setSmsMessageBody(messageBody);
      setOtp(otp);
      setSmsMessageNumber(messageOriginatingAdd);
    } else {
      setSmsMessageBody(null);
      setSmsMessageNumber(null);
    }
  }, [smsMessageData]);

  useEffect(() => {
    setAppState("init");
    checkPermissions();
  }, []);

  useEffect(() => {
    if (hasReceiveSMSPermission && hasReadSMSPermission) {
    }
  }, [hasReceiveSMSPermission, hasReadSMSPermission]);

  return (
    <>
      <View style={styles.container}>
        <Button
          icon="email"
          mode="contained"
          onPress={() => buttonClickHandler()}
        >
          {isUserStartedReadingSMS
            ? "Vous avez commencé à écouter les SMS entrants"
            : "Cliquez ici pour écouter les SMS entrants"}
        </Button>
        <TextInput
          label="Vous trouverez ici l'OTP"
          value={otp}
          readOnly
          style={{ width: "80%", marginTop: 20 }}
        />
      </View>
      <View style={{ marginTop: 30, flex: 1, marginHorizontal: 40 }}>
        <Text style={styles.textLabel}>SMS Message Data : </Text>
        <Text style={styles.textValue}>{JSON.stringify(smsMessageData)}</Text>
        <Text style={styles.textLabel}>Envoyeur : </Text>
        <Text style={styles.textValue}>{smsMessageNumber}</Text>
        <Text style={styles.textLabel}>Contenu du message : </Text>
        <Text style={styles.textValue}>{smsMessageBody}</Text>
        <Text style={styles.textLabel}>OTP ?: </Text>
        <Text style={styles.textValue}>{otp}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  textValue: {
    fontSize: 16,
  },
});
