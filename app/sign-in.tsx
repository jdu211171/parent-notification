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
import {useContext} from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
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

// const translations = {
//   en: {
//     welcome: 'Welcome Back',
//     login: 'Login to access your account',
//     email: 'Email',
//     enterEmail: 'Enter email here',
//     password: 'Password',
//     enterPassword: 'Enter password here',
//     loginToAccount: 'Login to Account',
//     forgotPassword: 'Forgot your password?',
//     resetPassword: 'reset password',
//   },
//   ja: {
//     welcome: 'お帰りなさい',
//     login: 'アカウントにログイン',
//     email: 'メールアドレス',
//     enterEmail: 'メールアドレスを入力',
//     password: 'パスワード',
//     enterPassword: 'パスワードを入力',
//     loginToAccount: 'アカウントにログイン',
//     forgotPassword: 'パスワードを忘れましたか？',
//     resetPassword: 'パスワードをリセット',
//   },
// };
// const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
// i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
// i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export default function SignIn() {
  const {signIn} = useSession();
  const { language, i18n, setLanguage } = useContext(I18nContext);
  const  toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
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
    signIn();
    router.replace('/');
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
              <Select options={menuOptions} selectedValue={language === 'ja' ? menuOptions[1] : menuOptions[1]}/>
            </View>
          </View>
          <Input
            label={i18n[language].email}
            placeholder={i18n[language].enterEmail}
            onChangeText={text => console.log(text)}
          />
          <SecureInput
            label={i18n[language].password}
            placeholder={i18n[language].enterPassword}
            onChangeText={text => console.log(text)}
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
