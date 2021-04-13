import {
  MAX_CHARS,
  parseUsername
} from '../../lib/domain/Username'
import '@relmify/jest-fp-ts'

describe('Domain - Username', () => {
  it('should return Left when username is not alphanumeric', () => {
    const username = '!@#!#'

    const result = parseUsername(username)

    expect(result).toBeLeft()
  })

  it('should return Left when username is longer than the maximum characters allowed', () => {
    let username = ''
    for (let i = 0; i < MAX_CHARS + 2; ++i) {
      username += 'a'
    }

    const result = parseUsername(username)

    expect(result).toBeLeft()
  })

  it('should return Left when username is shorter than the minimum characters allowed', () => {
    const username = 'a'

    const result = parseUsername(username)

    expect(result).toBeLeft()
  })

  it('should return Right when username seems okay', () => {
    const username = 'okayusername'

    const result = parseUsername(username)

    expect(result).toBeRight()
  })
})
