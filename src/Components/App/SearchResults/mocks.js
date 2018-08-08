import shortId from "shortid"

const entrySample = () => ({
  id: shortId.generate(),
  text: "privacy",
  entries: [
    {
      id: shortId.generate()
    }
  ],
  language: "es",
  lexicalCategory: "Noun",
  pronunciations: [
    {
      id: shortId.generate(),
      audioFile: "http://audio.oxforddictionaries.com/en/mp3/privacy_gb_1.mp3",
      phoneticSpelling: "prɪvəsi",
      dialects: ["British English"]
    },
    {
      id: shortId.generate(),
      phoneticSpelling: "prʌɪvəsi",
      dialects: ["British English"]
    }
  ]
})

export default entrySample
