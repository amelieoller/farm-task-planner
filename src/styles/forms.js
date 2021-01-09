import styled from 'styled-components'

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.label`
  font-size: 14px;
  text-transform: uppercase;
  color: #d7d7d7;
`

const TextInput = styled.input`
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
`

const Button = styled.button`
  padding: 8px 18px;
  background: #81a2d8;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #9dbcee;
  }

  &.delete {
    background: #ef6d67;

    &:hover {
      background: #f2908b;
    }
  }

  a {
    color: white;

    &:hover {
      text-decoration: none;
    }
  }
`

const Checkbox = styled.input`
  /* padding: 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin: 0 0 1rem; */
`

export { FormRow, FormLabel, TextInput, Button, Checkbox }
