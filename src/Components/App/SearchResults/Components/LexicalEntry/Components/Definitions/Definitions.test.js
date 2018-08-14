import React from "react"
import { render, cleanup } from "react-testing-library"
import Definitions from "./index"

describe("<Definitinos />", () => {
  afterEach(cleanup)

  const entry = {
    entries: [{ senses: [] }]
  }

  it("Render self", () => {
    const { container } = render(<Definitions entry={entry} />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
