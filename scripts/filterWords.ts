import fs from "fs"
import path from "path"

const raw = require("./words_dictionary.json")

const badWordsPath = path.resolve(__dirname, "badwords.txt")
const badWords = fs
  .readFileSync(badWordsPath, "utf-8")
  .split("\n")
  .map((w) => w.trim().toLowerCase())

const badWordsSet = new Set(badWords)

const isValidWord = (word: string): boolean => {
  return word.length >= 4 && /^[a-z]+$/.test(word) && !badWordsSet.has(word)
}

const filteredWords: Record<string, true> = {}

for (const word in raw) {
  const lower = word.toLowerCase()
  if (isValidWord(lower)) {
    filteredWords[lower] = true
  }
}

fs.writeFileSync(
  path.resolve(__dirname, "./filteredWords.json"),
  JSON.stringify(filteredWords, null, 2)
)

console.log(
  `✅ Filtered word list saved. Total words: ${
    Object.keys(filteredWords).length
  }`
)
