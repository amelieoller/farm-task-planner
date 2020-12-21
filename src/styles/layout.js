import styled from 'styled-components'

const HeaderFooterWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: 100vh;
`

const Header = styled.div`
  background: #76aede;
  color: white;

  & > div {
    width: 100%;
    max-width: 1000px;
    padding: 1rem;
    margin: 0 auto;
  }
`

const Footer = styled.div`
  padding: 1rem;
  text-align: center;
  opacity: 0.3;
`

export { HeaderFooterWrapper, Header, Footer }
