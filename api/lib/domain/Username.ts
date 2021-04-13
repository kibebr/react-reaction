import { left, right, Either } from 'fp-ts/Either'
import { isAlphanumeric } from '../utils/String'
import { iso, Newtype } from 'newtype-ts'

export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}

const usernameIso = iso<Username>()

type DomainError
  = 'UsernameNotAlpha'
  | 'UsernameTooLong'
  | 'UsernameTooShort'

export const parseUsername = (u: string): Either<DomainError, Username> => {
  if (!isAlphanumeric(u)) {
    return left('UsernameNotAlpha')
  } else if (u.length > 15) {
    return left('UsernameTooLong')
  } else if (u.length <= 0) {
    return left('UsernameTooShort')
  } else {
    return right(usernameIso.wrap(u))
  }
}
