import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  background: aliceblue;
  grid-column: span 2;
  height: 4rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: blue;
  }
  ul {
    display: flex;
    list-style: none;
    li {
      padding: 1rem;
      color: #626262;
    }
  }
`

export const WelcomeListItem = styled.li`
  text-transform: capitalize;
`

export const Logout = styled.li`
  &:hover {
    color: green;
    cursor: pointer;
  }
`
