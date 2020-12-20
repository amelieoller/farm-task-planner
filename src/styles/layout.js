import styled from 'styled-components'

const HeaderFooterWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: 100vh;
`
const Header = styled.div`
  padding: 1rem 1rem;
  background: #e7cb58;
`
const Page = styled.div`
  padding: 1rem;
`
const Footer = styled.div`
  padding: 1rem;
  text-align: center;
  opacity: 0.3;
`

export { HeaderFooterWrapper, Header, Page, Footer }
