import React from 'react'
import Arrow from '../../../../../assets/down-arrow.svg'

import { SvgProps } from 'react-native-svg'

export class ArrowIcon extends React.Component<SvgProps> {
  constructor(props: SvgProps) {
    super(props)
  }
  render() {
    return <Arrow {...this.props} />
  }
}
