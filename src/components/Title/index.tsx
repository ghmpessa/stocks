import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Theme } from '../../styles/theme'

import BackArrow from '../../../assets/left-arrow.svg'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title: string
  back?: true
}

const Title: React.FC<Props> = ({ title, back }) => {
  const { goBack } = useNavigation()
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <BackArrow />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontFamily: Theme.fonts.poppinsBold,
    fontSize: 24,
    color: Theme.colors.white,
  },
  backButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: '100%',
    padding: 10,
    left: 10,
  },
})

export default Title
