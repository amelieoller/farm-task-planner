import styled from 'styled-components'

const HeaderFooterWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: 100vh;
`

const Header = styled.div`
  background: #73c1ac;
  color: white;
  width: 100%;
  padding: 1rem;

  & > div {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Footer = styled.div`
  text-align: center;
  opacity: 0.3;
`

export { HeaderFooterWrapper, Header, Footer }
