import fs from "fs"
import path from "path"
import { whitelist } from "./whitelist"

const raw = require("./words_dictionary.json")

const badWordsPath = path.resolve(__dirname, "badwords.txt")
const badWords = fs
  .readFileSync(badWordsPath, "utf-8")
  .split("\n")
  .map((w) => w.trim().toLowerCase())
  .filter(Boolean)

const badSet = new Set(badWords)

const containsProfanity = (word: string): boolean => {
  if (whitelist.has(word)) return false

  for (const bad of badSet) {
    if (word.includes(bad)) {
      return true
    }
  }

  return false
}

const isValidWord = (word: string): boolean => {
  return word.length >= 4 && /^[a-z]+$/.test(word) && !containsProfanity(word)
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

console.log(`✅ Filtered word list saved to filteredWords.json`)
console.log(`Total valid words: ${Object.keys(filteredWords).length}`)
