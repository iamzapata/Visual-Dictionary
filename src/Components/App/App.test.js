import React from 'react'
import { render } from 'react-testing-library'
import App from './index.jsx'

describe('<App />', () => {
  const { container } = render(<App />)

  it('renders <App />', () => {
    expect(container.firstChild).toMatchSnapshot()
  })

})