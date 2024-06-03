// import {SafeAreaView, StyleSheet} from 'react-native';
// import {ThemedView} from '@/components/ThemedView';
// import Button from "@/components/atomic/button";
// import {useSession} from "@/contexts/auth-context";
//
// export default function SettingsScreen() {
//   const {signOut} = useSession();
//   const handlePress = () => {
//     signOut();
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <ThemedView style={{top: 0}}>
//
//         <Button onPress={handlePress} title="Logout"/>
//       </ThemedView>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Pressable,
  Switch,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import Button from "@/components/atomic/button";
import {useSession} from "@/contexts/auth-context";

export default function SettingsScreen() {

  const {signOut} = useSession();
  const handlePress = () => {
    signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.profile}>
          <Pressable
            onPress={() => {
              // handle onPress
            }}>
          </Pressable>

          <ThemedView>
            <ThemedText style={styles.profileName}>John Doe</ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView>
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>

            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <ThemedView style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                <Ionicons color="#fff" name="globe" size={20}/>
              </ThemedView>

              <ThemedText style={styles.rowLabel}>Language</ThemedText>

              <ThemedView style={styles.rowSpacer}/>

              <Ionicons color="#C6C6C6" name="chevron-forward" size={20}/>
            </Pressable>

            <ThemedView style={styles.row}>
              <ThemedView style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
                <Ionicons color="#fff" name="moon" size={20}/>
              </ThemedView>

              <ThemedText style={styles.rowLabel}>Dark Mode</ThemedText>

              <ThemedView style={styles.rowSpacer}/>

              <Switch
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={{padding: 10}}>
            <Button onPress={handlePress} title="Logout"/>
          </ThemedView>

        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 8,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
