import fs from "fs"
import path from "path"

const raw = require("../words_dictionary.json")

const isValidWord = (word: string): boolean => {
  return (
    word.length >= 4 && /^[a-z]+$/.test(word) // only lowercase letters, no punctuation or caps
  )
}

const filteredWords: Record<string, true> = {}

for (const word in raw) {
  const lower = word.toLowerCase()
  if (isValidWord(lower)) {
    filteredWords[lower] = true
  }
}

fs.writeFileSync(
  path.resolve(__dirname, "../filteredWords.json"),
  JSON.stringify(filteredWords, null, 2)
)

console.log(
  `✅ Filtered word list saved. Total words: ${
    Object.keys(filteredWords).length
  }`
)
