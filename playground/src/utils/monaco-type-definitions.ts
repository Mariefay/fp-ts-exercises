import type * as Monaco from 'monaco-editor'

/**
 * Returns fp-ts type definitions for Monaco Editor IntelliSense
 */
export function getFptsTypeDefinitions(): string {
  return `
    declare module 'fp-ts/Option' {
      export interface None {
        readonly _tag: 'None'
      }
      export interface Some<A> {
        readonly _tag: 'Some'
        readonly value: A
      }
      export type Option<A> = None | Some<A>
      export const none: Option<never>
      export function some<A>(a: A): Option<A>
      export function of<A>(a: A): Option<A>
      export function fromNullable<A>(a: A | null | undefined): Option<A>
      export function fromPredicate<A>(predicate: (a: A) => boolean): (a: A) => Option<A>
      export function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Option<A>) => B
      export function getOrElse<A>(onNone: () => A): (ma: Option<A>) => A
      export function filter<A>(predicate: (a: A) => boolean): (ma: Option<A>) => Option<A>
      export function map<A, B>(f: (a: A) => B): (ma: Option<A>) => Option<B>
      export function chain<A, B>(f: (a: A) => Option<B>): (ma: Option<A>) => Option<B>
      export function isSome<A>(ma: Option<A>): ma is Some<A>
      export function isNone<A>(ma: Option<A>): ma is None
      export function toNullable<A>(ma: Option<A>): A | null
      export function toUndefined<A>(ma: Option<A>): A | undefined
      export function fromEither<E, A>(ma: import('fp-ts/Either').Either<E, A>): Option<A>
    }

    declare module 'fp-ts/Either' {
      export interface Left<E> {
        readonly _tag: 'Left'
        readonly left: E
      }
      export interface Right<A> {
        readonly _tag: 'Right'
        readonly right: A
      }
      export type Either<E, A> = Left<E> | Right<A>
      export function left<E>(e: E): Either<E, never>
      export function right<A>(a: A): Either<never, A>
      export function of<A>(a: A): Either<never, A>
      export function fromPredicate<E, A>(
        predicate: (a: A) => boolean,
        onFalse: (a: A) => E
      ): (a: A) => Either<E, A>
      export function fold<E, A, B>(
        onLeft: (e: E) => B,
        onRight: (a: A) => B
      ): (ma: Either<E, A>) => B
      export function getOrElse<E, A>(onLeft: (e: E) => A): (ma: Either<E, A>) => A
      export function map<A, B>(f: (a: A) => B): <E>(ma: Either<E, A>) => Either<E, B>
      export function mapLeft<E, G>(f: (e: E) => G): <A>(ma: Either<E, A>) => Either<G, A>
      export function chain<E, A, B>(
        f: (a: A) => Either<E, B>
      ): (ma: Either<E, A>) => Either<E, B>
      export function isLeft<E, A>(ma: Either<E, A>): ma is Left<E>
      export function isRight<E, A>(ma: Either<E, A>): ma is Right<A>
      export function toUnion<E, A>(ma: Either<E, A>): E | A
    }

    declare module 'fp-ts/function' {
      export function pipe<A>(a: A): A
      export function pipe<A, B>(a: A, ab: (a: A) => B): B
      export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
      export function pipe<A, B, C, D>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D
      ): D
      export function pipe<A, B, C, D, E>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E
      ): E
      export function pipe<A, B, C, D, E, F>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F
      ): F
      export function flow<A extends ReadonlyArray<unknown>, B>(
        ab: (...a: A) => B
      ): (...a: A) => B
      export function flow<A extends ReadonlyArray<unknown>, B, C>(
        ab: (...a: A) => B,
        bc: (b: B) => C
      ): (...a: A) => C
      export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
        ab: (...a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D
      ): (...a: A) => D
      export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
        ab: (...a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E
      ): (...a: A) => E
      export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
        ab: (...a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F
      ): (...a: A) => F
      export function identity<A>(a: A): A
      export function constant<A>(a: A): () => A
    }
  `
}

/**
 * Returns Vitest type definitions for Monaco Editor IntelliSense
 */
export function getVitestTypeDefinitions(): string {
  return `
    declare module 'vitest' {
      export function describe(name: string, fn: () => void): void
      export function it(name: string, fn: () => void): void
      export const expect: {
        <T>(actual: T): {
          toEqual<U>(expected: U): void
          toBe<U>(expected: U): void
          toBeUndefined(): void
          toBeNull(): void
          toBeTruthy(): void
          toBeFalsy(): void
        }
      }
    }
  `
}

/**
 * Registers fp-ts and Vitest type definitions with Monaco Editor
 * @param monaco - Monaco editor instance
 */
export function registerMonacoLibs(monaco: typeof Monaco): void {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    getFptsTypeDefinitions(),
    'file:///node_modules/@types/fp-ts.d.ts'
  )

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    getVitestTypeDefinitions(),
    'file:///node_modules/@types/vitest.d.ts'
  )
}
