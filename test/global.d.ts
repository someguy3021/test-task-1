import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
  namespace Vi {
    interface Assertion extends TestingLibraryMatchers<any, any> {}
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, any> {}
  }
}

export {}