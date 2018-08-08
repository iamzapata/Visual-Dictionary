import shortId from "shortid"
import { isNil } from "ramda"

const hydrateWithIds = array => {
  if (isNil(array)) return []
  return array.map(item => ({ ...item, id: shortId.generate() }))
}

export default hydrateWithIds
