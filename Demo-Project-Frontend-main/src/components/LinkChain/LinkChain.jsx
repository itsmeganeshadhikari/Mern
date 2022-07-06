import React from 'react'
import { HeadingLabel1 } from '../styled'
import { BetterLink, LinkWrapper } from './LinkWrap'

const LinkChain = () => {
  return (
    <LinkWrapper>
      <BetterLink to='/home'>Home</BetterLink>

      <span className='separator'>/</span>

      <BetterLink to='/market'>Market</BetterLink>

      <span className='separator'>/</span>
      <HeadingLabel1>SingleProductPage</HeadingLabel1>
    </LinkWrapper>
  )
}

export default LinkChain
