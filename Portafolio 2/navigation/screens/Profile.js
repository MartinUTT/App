import React from "react";

import { View, Text, StyleSheet} from "react-native";

export default function Profile({navigation}) {
    return(
        <View style={styles.Text}>
            <Text >
                Soy Profile
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Text: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });