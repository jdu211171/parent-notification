import {router} from 'expo-router';
import {Keyboard, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {useSession} from "@/contexts/auth-context";
import {SafeAreaView} from "react-native-safe-area-context";
import Select from "@/components/atomic/select";
import Input from "@/components/atomic/input";
import Button from "@/components/atomic/button";
import SecureInput from "@/components/atomic/secure-input";
import {getLocales} from "expo-localization";
import {I18n} from "i18n-js";
import translations from "@/translations/translation";
import {I18nContext} from "@/contexts/i18n-context";
import React, {useContext, useRef, useState} from "react";
import Toast from 'react-native-root-toast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    alignContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 50,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    color: 'gray',
    fontSize: 16,
  },
  inputContainer: {
    paddingTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 10,
  },
  resetPassword: {
    fontWeight: 'bold',
    color: '#059669',
  },
});

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useSession();
  const { language, i18n, setLanguage } = useContext(I18nContext);
  const  toggleLanguage = () => {
    setLanguage(language === 'en' ? 'en' : 'ja');
  };
  const menuOptions = [
    {
      icon: 'edit',
      label: 'English',
      action: () => setLanguage('en'),
      lightColor: '#3399ff',
      darkColor: '#66a3ff',
    },
    {
      icon: 'trash',
      label: '日本語',
      action: () => setLanguage('ja'),
      lightColor: '#ff5733',
      darkColor: '#ff8c66',
    },
  ];

  const handlePress = () => {
    signIn(email, password)
      .then(() => {
        console.log('email', email)
        console.log('password', password)
      })
      .catch((reason) => {
      let toast = Toast.show(`${reason}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        containerStyle: {
          backgroundColor: '#ff0000',
          borderRadius: 5,
        }
      });
    })
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>
                {i18n[language].welcome}
              </Text>
              <Text style={styles.subtitle}>
                {i18n[language].login}
              </Text>
            </View>
            <View>
              <Select options={menuOptions} selectedValue={language === 'en' ? menuOptions[0] : menuOptions[1]}/>
            </View>
          </View>
          <Input
            label={i18n[language].email}
            placeholder={i18n[language].enterEmail}
            onChangeText={setEmail}
            onBlur={e => console.log('onBlur', e.nativeEvent.text)}
          />
          <SecureInput
            label={i18n[language].password}
            placeholder={i18n[language].enterPassword}
            onChangeText={setPassword}
            onBlur={e => console.log('onBlur', e.nativeEvent.text)}
          />
          <Button onPress={handlePress} title={i18n[language].loginToAccount}/>
          <View style={styles.buttonContainer}>
            <Text>{i18n[language].forgotPassword}</Text>
            <Text style={styles.resetPassword}>{i18n[language].resetPassword}</Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
