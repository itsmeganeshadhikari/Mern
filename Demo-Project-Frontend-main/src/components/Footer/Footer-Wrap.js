import styled from 'styled-components'

export const FooterWrapper = styled.div`
  background: aliceblue;
  // position: absolute;
  // bottom: 0;
  width: 100%;
  grid-column: span 2;
  height: 60px;
  color: #626262;
  ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    li {
      padding: 1rem;
    }
  }
`
