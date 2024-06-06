import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import Button from "@/components/atomic/button";
import {useSession} from "@/contexts/auth-context";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import CustomSwitch from "@/components/atomic/custom-switch";
import {useTheme} from "@/contexts/theme-context";

interface LanguageSelectionProps {
  language: string;
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({language, selectedLanguage, onSelect}) => (
  <TouchableOpacity
    key={language}
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 4,
      width: '100%',
      borderColor: selectedLanguage === language ? '#059669' : 'grey',
      padding: 10,
      marginBottom: 10,
    }}
    onPress={() => onSelect(language)}
  >
    <ThemedText>{language}</ThemedText>
    <Ionicons name={'checkmark'} size={20} color={selectedLanguage === language ? '#059669' : 'transparent'}/>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "30%"];
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', '日本語'];



  const handlePresentModal = useCallback(() => {
    // @ts-ignore
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const {signOut} = useSession();
  const handlePress = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    setSelectedLanguage('English');
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheetModalProvider>
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
                onPress={handlePresentModal}
                style={styles.row}>
                <ThemedView style={[styles.rowIcon, {backgroundColor: '#fe9400'}]}>
                  <Ionicons color="#fff" name="globe" size={20}/>
                </ThemedView>

                <ThemedText style={styles.rowLabel}>Language</ThemedText>

                <ThemedView style={styles.rowSpacer}/>

                <Ionicons color="#C6C6C6" name="chevron-forward" size={20}/>
              </Pressable>
              {/*
              <ThemedView
                style={styles.row}>
                <ThemedView style={[styles.rowIcon, {backgroundColor: '#007afe'}]}>
                  <Ionicons color="#fff" name="moon" size={20}/>
                </ThemedView>

                <ThemedText style={styles.rowLabel}>Dark Mode</ThemedText>

                <ThemedView style={styles.rowSpacer}/>
                <CustomSwitch value={darkmode} onValueChange={toggleTheme} />
              </ThemedView>
              */}
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={{backgroundColor: '#eee'}}
                onDismiss={() => setIsOpen(false)}
              >
                <ThemedView style={styles.contentContainer}>
                  <ThemedView style={styles.row}>
                  </ThemedView>
                                    <ThemedView>
                    {languages.map((language) => (
                      <LanguageSelection
                        key={language}
                        language={language}
                        selectedLanguage={selectedLanguage}
                        onSelect={setSelectedLanguage}
                      />
                    ))}
                  </ThemedView>

                </ThemedView>
              </BottomSheetModal>
            </ThemedView>

            <ThemedView style={{padding: 10}}>
              <Button onPress={handlePress} title="Logout"/>
            </ThemedView>

          </ScrollView>
        </ThemedView>
      </BottomSheetModalProvider>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    borderRadius: 8,
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
});
