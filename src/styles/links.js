import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from './colors'

const InternalLink = styled(Link)`
  color: ${colors.blue};
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`
const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 1.2rem;

  img {
    width: 30px;
  }
`

export { InternalLink, HeaderLink }
