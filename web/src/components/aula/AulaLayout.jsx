import React from 'react'
import PropTypes from 'prop-types'
import {useLoginCheck} from '@/hocs/UseLoginCheck'
import { ContentWrapper, LayoutWrapper } from '../layout/style.jsx'
import HeaderAula from './HeaderAula.jsx'

const AulaLayout = ({ children }) => {
    useLoginCheck()
  return (
    <>
      <HeaderAula />
      <LayoutWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </LayoutWrapper>
    </>
  )
}

AulaLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AulaLayout
