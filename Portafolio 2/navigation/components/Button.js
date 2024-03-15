import React from "react";
import { StyleSheet,View, Text, Pressable } from "react-native";


export default function Button({onPress}) {
    return(
        <View>
            <Pressable style={styles.Button} onPress={onPress}>
                <Text>Ir al Profile</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    Button: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
