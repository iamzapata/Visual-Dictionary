import hydrateWithId from "./index"

describe("hydrateId", () => {
  it("Should add an id property to each object in a given array", () => {
    const hydratedItems = hydrateWithId([{ a: "a" }, { b: "b" }, { c: "" }])
    const itemsWereHydratedWithId = hydratedItems.every(i => i.id)
    expect(itemsWereHydratedWithId).toBe(true)
  })
})
