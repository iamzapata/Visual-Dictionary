import hydrateWithId from "./index"
import { type } from "ramda"

describe("hydrateId", () => {
  it("Should be defined", () => {
    expect(hydrateWithId([])).toBeTruthy()
  })

  it("Should hydrate array's items with a 'truthy' id property", () => {
    const hydratedItems = hydrateWithId([{ a: "a" }, { b: "b" }, { c: "c" }])
    const wereItemsHydratedWithId = hydratedItems.every(i => i.id)
    expect(wereItemsHydratedWithId).toBe(true)
  })

  it("Should keep all other properties intact", () => {
    const items = [{ name: "a" }, { name: "b" }, { name: "c" }]
    const hydratedItems = hydrateWithId(items)
    const wereItemsHydratedWithId = hydratedItems.every(
      (item, index) => item.id && item.name === items[index].name
    )
    expect(wereItemsHydratedWithId).toBe(true)
  })

  it("Should return Array when undefined or null passed in as argument", () => {
    expect(type(hydrateWithId(undefined))).toBe("Array")
  })
})
