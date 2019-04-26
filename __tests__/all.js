import CustomPromise from '../index.js'
import { scheduleResolve, scheduleReject } from '../__utils__'

test('CustomPromise.all handles arrays of primitives', () => {
  return CustomPromise.all([1, 'string', false])
})

test('CustomPromise.all throws for non-array inputs', () => {
  return expect(() => {
    CustomPromise.all('string')
  }).toThrow()
})

test(`CustomPromise.all rejects if one of its inputs rejects`, () => {
  const mockInput = [
    scheduleResolve(110, 1),
    scheduleReject(120, 'reject1'),
    scheduleReject(130, 'reject2'),
    scheduleResolve(140, 2)
  ]
  const firstRejectedPromiseValue = 'reject1'
  return expect(CustomPromise.all(mockInput)).rejects.toBe(
    firstRejectedPromiseValue
  )
})

test(`CustomPromise.all resolves correctly if all of its inputs resolve`, () => {
  const mockInput = [
    scheduleResolve(110, 1),
    scheduleResolve(120, 2),
    scheduleResolve(130, 3)
  ]
  const mockOutput = [1, 2, 3]
  return expect(CustomPromise.all(mockInput)).resolves.toMatchObject(mockOutput)
})

test(`CustomPromise.all saves values to output in order of their position in the input`, () => {
  const mockInput = [
    scheduleResolve(130, 1),
    scheduleResolve(120, 2),
    scheduleResolve(110, 3)
  ]
  const mockOutput = [1, 2, 3]
  return expect(CustomPromise.all(mockInput)).resolves.toMatchObject(mockOutput)
})