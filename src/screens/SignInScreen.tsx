import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import i18n from '../languages/i18n.config'

//  components
import ChattingImage from '../components/img/ChattingImage'
import Button from '../components/common/Button'

const SignInScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.image}>
        <ChattingImage />
      </View>
      <Text style={styles.text}>{i18n.t('take privacy with you')}</Text>
      <Text style={styles.text}>{i18n.t('be youself in every message')}</Text>
      <View style={styles.footer}>
        <Button text={i18n.t('continue')} containerStyle={styles.buttonStyle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 40
  },

  image: {
    width: '100%',
    height: '40%',
    marginTop: 50,
    marginBottom: '10%'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto'
  },

  text: {
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500'
  },

  buttonStyle: {
    marginBottom: 25
  }
})

export default SignInScreen
