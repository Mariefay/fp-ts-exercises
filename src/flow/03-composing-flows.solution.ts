import { flow } from 'fp-ts/function'
import { describe, it, expect } from 'vitest'

const trim = (s: string): string => s.trim()
const toLowerCase = (s: string): string => s.toLowerCase()
const splitWords = (s: string): string[] => s.split(' ')
const countWords = (words: string[]): number => words.length

export const normalizeText = flow(
  trim,
  toLowerCase
)

export const countWordsInText = flow(
  normalizeText,
  splitWords,
  countWords
)

//TESTS
describe('text processing flows', () => {
  it('normalizes text', () => {
    const result = normalizeText('  Hello WORLD  ')
    expect(result).toEqual('hello world')
  })

  it('counts words in text', () => {
    const result = countWordsInText('  Hello WORLD  ')
    expect(result).toEqual(2)
  })

  it('counts words in longer text', () => {
    const result = countWordsInText('  The Quick Brown FOX  ')
    expect(result).toEqual(4)
  })

  it('handles single word', () => {
    const result = countWordsInText('  Hello  ')
    expect(result).toEqual(1)
  })
})
