import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Separator} from "@/components/atomic/separator";
import Card from "@/components/card";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

function HomeScreen() {
  const colorScheme = useColorScheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ThemedView /*style={{backgroundColor: 'black'}}*/>
          <Card
            title="Lean UX: Applying Lean Principles to Improve User Experience"
            description="Although Intel’s revenue is no longer shrinking and the company
          remains the biggest maker of processors that power PCs and laptops,
          sales in ..."
            date="October 30, 2023"
            isRead={false}
          />
          <Separator orientation="horizontal"/>
          <ThemedView style={[styles.cardOpacity/*, {backgroundColor: 'black'}*/]}>
            <Card
              title="Lean UX: Applying Lean Principles to Improve User Experience"
              description="Although Intel’s revenue is no longer shrinking and the company
          remains the biggest maker of processors that power PCs and laptops,
          sales in ..."
              date="October 30, 2023"
              isRead={true}
            />
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#151718'
  },
  cardOpacity: {
    opacity: 0.4,
  },
});

export default HomeScreen;
