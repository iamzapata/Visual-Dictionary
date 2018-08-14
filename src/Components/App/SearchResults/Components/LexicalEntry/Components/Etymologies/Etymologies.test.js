import React from "react"
import { render, cleanup } from "react-testing-library"
import Etymologies from "./index"

describe("<Etymologies />", () => {
  afterEach(cleanup)

  const entry = {
    entries: [{ etymologies: ["a", "b"] }]
  }

  it("Should render self", () => {
    const { container } = render(<Etymologies entry={entry} />)
    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
