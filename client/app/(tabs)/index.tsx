import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');

  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const subscription = useRef<Subscription | null>(null);

  console.log('illuminance', illuminance);

  useEffect(() => {
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription.current) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    subscription.current = LightSensor.addListener(setData);
  };

  const _unsubscribe = () => {
    subscription.current?.remove();
    subscription.current = null;
  };

  // useEffect(() => {
  //   const sendData = async () => {
  //     if (!illuminance) {
  //       await fetch('', {
  //         method: 'POST',
  //         body: JSON.stringify({ illuminance }),
  //       });
  //     }
  //   };

  //   sendData();
  // }, [illuminance]);

  return (
    <View style={[{ backgroundColor }, styles.container]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Check your light!</ThemedText>
      </ThemedView>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tint }]}
          activeOpacity={0.7}
          onPress={_toggle}
        >
          <Text>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: '60%',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 50,
    borderRadius: 12,
  },
});
