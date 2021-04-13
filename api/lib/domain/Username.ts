import { Either } from 'fp-ts/Either'

type DomainError
  = 'UsernameNotAlpha'
  | 'UsernameTooLong'
  | 'UsernameTooShort'

export const validateUsername = (u: string): Either<DomainError, string> => {
}
