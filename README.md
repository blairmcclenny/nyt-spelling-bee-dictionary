# Word List Filter Script

This is a simple Node + TypeScript script that filters an English word list and outputs a cleaned `filteredWords.json` file. The result is ideal for use in word games like a Spelling Bee clone.

## What It Does

- Loads a full dictionary (`words_dictionary.json`)
- Filters for words that:
  - Are at least 4 letters long
  - Use only lowercase alphabetic characters
- Outputs a clean JSON object:

  ```json
  {
    "apple": true,
    "brain": true,
    "hello": true
  }
  ```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add a base dictionary

Place a raw word list JSON file in the `scripts/` folder.  
You can use [`words_dictionary.json`](https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json) from the [dwyl/english-words](https://github.com/dwyl/english-words) repository.

### 3. Run the script

```bash
npm run filter
```

This will generate a `filteredWords.json` file in the same directory.

### 4. Use the filtered word list

Move `filteredWords.json` into your front-end project (e.g. `src/data/`) and import it like this:

```ts
import wordlist from "../data/filteredWords.json"

const isValidWord = (word: string): boolean => {
  return wordlist[word.toLowerCase()] === true
}
```

## File Structure

```
scripts/
├── words_dictionary.json       # Raw word list (input)
├── filteredWords.json          # Filtered list (output)
├── filterWords.ts              # Script file
```

## License

MIT – Free to use and modify.
