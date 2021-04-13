import { isAlphanumeric } from '../../lib/utils/String'

describe('Utils - String', () => {
  describe('Alphanumeric test', () => {
    it('should return false for non-alphanumeric string', () => {
      const str = '##'

      const result = isAlphanumeric(str)

      expect(result).toBe(false)
    })
  })
})
