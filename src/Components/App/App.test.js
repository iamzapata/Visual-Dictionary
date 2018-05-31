import React from 'react'
import { render } from 'react-testing-library'
import App from './index.jsx'

describe('<App />', () => {

  let props = { header: 'Visual Dictionary'}

  it('renders <App />', () => {
    const { container, queryByText } = render(<App {...props}/>)
    expect(container.firstChild).toMatchSnapshot()
    const header = queryByText(props.header)
    expect(header.innerHTML).toBe(props.header)
  })

  it('renders a <SearchBox /> component', () => {
    const { container } = render(<App />)
    const searchBox = container.querySelectorAll('.SearchBox');
    expect(searchBox.length).toBe(1)
  })

  it('renders a <SearchResults /> component', () => {
    const { container } = render(<App />)
    const results = container.querySelectorAll('.SearchResults')
    expect(results.length).toBe(1)
  })
})