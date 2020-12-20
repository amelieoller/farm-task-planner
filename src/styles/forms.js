import styled from 'styled-components'

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.label`
  font-size: 14px;
  text-transform: uppercase;
`

const TextInput = styled.input`
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #65a5d9;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 16px;
`

const Checkbox = styled.input`
  /* padding: 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin: 0 0 1rem; */
`

export { FormRow, FormLabel, TextInput, Button, Checkbox }
