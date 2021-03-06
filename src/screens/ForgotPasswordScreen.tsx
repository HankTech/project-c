import { View, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import { EMAIL_REGEX } from '../constants'
import i18n from '../languages/i18n.config'

//  components
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, getValues, setValue } = useForm()
  const navigation = useNavigation<any>()

  const onBlur = () => {
    const email = getValues('email').trim()
    setValue('email', email)
  }

  const onSendPressed = async (data: any) => {
    try {
      const response = await Auth.forgotPassword(data.email)
      console.log(response)
      navigation.navigate('NewPasswordScreen')
    } catch (error: any) {
      Alert.alert('Opps', error?.message)
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View style={styles.container}>
        <Input
          control={control}
          name='email'
          placeholder='email'
          inputStyles={styles.input}
          inputContainerStyles={styles.forgotPasswordInput}
          autoCapitalize='none'
          onBlur={onBlur}
          blurOnSubmit
          rules={{
            required: { value: true, message: i18n.t('the email is required') },
            pattern: { value: EMAIL_REGEX, message: i18n.t('enter a valid email') }
          }}
        />

        <Button
          text='Send'
          onPress={handleSubmit(onSendPressed)}
          buttonStyle={styles.sendButton}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },

  container: {
    flex: 1,
    paddingHorizontal: 15
  },

  input: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingLeft: 10
  },

  forgotPasswordInput: {
    marginTop: 35,
    marginBottom: 55
  },

  sendButton: {
    alignSelf: 'center'
  }
})

export default ForgotPasswordScreen
