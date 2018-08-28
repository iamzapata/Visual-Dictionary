import React from "react"
import { render, cleanup, fireEvent } from "react-testing-library"
import SuggestionLink from "./index"

describe("<SuggestionLink />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    suggestion: "sup",
    triggerSearchWord: jest.fn(),
    children: "sup"
  })

  it("Should render self", () => {
    const { container } = render(<SuggestionLink {...createProps()} />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should display a suggestion link", () => {
    const { queryByText } = render(<SuggestionLink {...createProps()} />)
    expect(queryByText("sup")).toBeTruthy()
  })

  it("Should allow user to search suggested term", () => {
    const props = createProps()

    const { container } = render(<SuggestionLink {...props} />)

    const button = container.querySelector("button")

    fireEvent.click(button)

    expect(props.triggerSearchWord).toHaveBeenCalledTimes(1)
    expect(props.triggerSearchWord).toHaveBeenCalledWith("sup")
  })
})
