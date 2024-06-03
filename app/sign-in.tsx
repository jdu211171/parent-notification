import {router} from 'expo-router';
import {Keyboard, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {useSession} from "@/contexts/auth-context";
import {SafeAreaView} from "react-native-safe-area-context";
import Select from "@/components/atomic/select";
import Input from "@/components/atomic/input";
import Button from "@/components/atomic/button";
import SecureInput from "@/components/atomic/secure-input";

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
    paddingTop: 4,
  },
  resetPassword: {
    fontWeight: 'bold',
    color: '#06B6D4',
  },
});

export default function SignIn() {
  const {signIn} = useSession();
  const menuOptions = [
    {
      icon: 'edit',
      label: 'English',
      action: () => {
      },
      lightColor: '#3399ff',
      darkColor: '#66a3ff',
    },
    {
      icon: 'trash',
      label: '日本語',
      action: () => {
      },
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
                Welcome Back
              </Text>
              <Text style={styles.subtitle}>
                Login to access your account
              </Text>
            </View>
            <View>
              <Select options={menuOptions}/>
            </View>
          </View>
          <Input
            label="Email"
            placeholder="Enter email here"
            onChangeText={text => console.log(text)}
          />
          <SecureInput
            label="Password"
            placeholder="Enter password here"
            onChangeText={text => console.log(text)}
          />
          <Button onPress={handlePress} title="Login to Account"/>
          <View style={styles.buttonContainer}>
            <Text>Forgot your password?</Text>
            <Text style={styles.resetPassword}>reset password</Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
