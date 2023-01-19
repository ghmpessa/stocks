import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native'
import { Theme } from '../../styles/theme'

type Props = {
  label?: string
  leftIcon: React.ReactNode
} & TextInputProps

const TextInput: React.FC<Props> = ({ label, leftIcon, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputRow}>
        {leftIcon}
        <RNTextInput
          underlineColorAndroid='transparent'
          style={styles.input}
          selectionColor={Theme.colors.primary.main}
          {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flex: 1,
  },
  inputLabel: {
    fontFamily: Theme.fonts.poppinsMedium,
    color: '#b8b8b8',
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingLeft: 4,
    paddingTop: 4,
    paddingBottom: 0,
    fontSize: 16,
    textDecoration: '',
    fontFamily: Theme.fonts.poppinsRegular,
    color: '#b2b2b2',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#2a303b',
  },
})

export default TextInput
