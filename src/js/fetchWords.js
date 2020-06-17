import words from './consts'

export default async function fetchWords() {
  return new Promise((resolve) => {
    resolve(words);
  })
}
