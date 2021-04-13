import { left, right, Either } from 'fp-ts/Either'
import { isAlphanumeric } from '../utils/String'
import { iso, Newtype } from 'newtype-ts'

export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}

export const usernameIso = iso<Username>()

export const MIN_CHARS = 3
export const MAX_CHARS = 15

export type DomainError
  = 'UsernameNotAlpha'
  | 'UsernameTooLong'
  | 'UsernameTooShort'

export const parseUsername = (u: string): Either<DomainError, Username> => {
  if (!isAlphanumeric(u)) {
    return left('UsernameNotAlpha')
  } else if (u.length > MAX_CHARS) {
    return left('UsernameTooLong')
  } else if (u.length <= MIN_CHARS) {
    return left('UsernameTooShort')
  } else {
    return right(usernameIso.wrap(u))
  }
}
