import { View, Text, StyleSheet, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import i18n from '../languages/i18n.config'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

//  component
import Input from '../components/common/Input'
import Button from '../components/common/Button'

type formData = {
  email: string,
  password: string,
  passwordRepeat: string
}

const SigupScreen = () => {
  const { control, handleSubmit, watch, setValue, getValues } = useForm<formData>()

  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<any>()

  const onBlur = () => {
    const email = getValues('email').trim()
    setValue('email', email)
  }

  const pass = watch('password')

  const onRegisterPressed = async (data: formData) => {
    const { email, password } = data

    if (loading) {
      return
    }

    setLoading(true)

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          preferred_username: email
        }
      })
      navigation.navigate('ConfirmEmailScreen', { email })
    } catch (error: any) {
      console.log(error)
      Alert.alert('Oops', error.message)
    }

    setLoading(false)
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.subtitle}>{i18n.t('enter a email and password')}</Text>

        <Input
          name='email'
          control={control}
          rules={{
            required: { value: true, message: i18n.t('the email is required') },
            pattern: { value: EMAIL_REGEX, message: i18n.t('enter a valid email') }
          }}
          placeholder={i18n.t('email')}
          inputStyles={styles.input}
          inputContainerStyles={styles.inputContainer}
        />

        <Input
          name='password'
          rules={{
            required: { value: true, message: i18n.t('the password is required') },
            minLength: { value: 8, message: i18n.t('password should be minimon 8 characters long') }
          }}
          control={control}
          placeholder={i18n.t('password')}
          secureTextEntry
          onBlur={onBlur}
          inputStyles={styles.input}
          inputContainerStyles={styles.inputContainer}
        />

        <Input
          name='passwordRepeat'
          rules={{
            validate: (value: string) => value === pass || i18n.t('password do not match')
          }}
          control={control}
          placeholder={i18n.t('password repeat')}
          secureTextEntry
          inputStyles={styles.input}
          inputContainerStyles={styles.inputContainer}
        />

        <Button
          text={i18n.t('register')}
          onPress={handleSubmit(onRegisterPressed)}
          buttonStyle={styles.submitButton}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  inner: {
    paddingBottom: 15,
    paddingHorizontal: 10
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50
  },

  input: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingLeft: 10
  },

  inputContainer: {
    marginBottom: 35
  },

  submitButton: {
    marginTop: '15%',
    alignSelf: 'center'
  }
})

export default SigupScreen
