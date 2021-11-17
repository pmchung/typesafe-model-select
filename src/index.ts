/**
 * @author Philip Chung <philip@pmhc.co> (https://github.com/pmchung)
 * @license MIT
 */


type Unpack<T> = T extends (infer U)[] ? U : T;
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

/**
 * SelectModel
 * @desc Given a select object, return the properties from the model and its defined type.
 * @example
 * const select = {
 *   name: true,
 *   email: true,
 *   password: true,
 *   amount: true,
 *   nestedArr: {
 *     a: true,
 *     zz: true,
 *   }
 * }
 * type partialUser = SelectModel<User, typeof select>
 *
 * @link(https://github.com/pmchung/typesafe-model-select) for full example
 */
export type SelectModel<M extends { [K in keyof T]?: M[K] }, T extends {}> = {
  [K in keyof T]:
  K extends OptionalKeys<M> ? (
    M[K] extends boolean | number | string | undefined ? M[K] :
    M[K] extends object[] | undefined ? SelectModel<Unpack<NonNullable<M[K]>>, T[K]>[] | undefined :
    M[K] extends object | undefined ? SelectModel<NonNullable<M[K]>, T[K]> | undefined : never
  ) : (
    M[K] extends boolean | number | string | null ? M[K] :
    M[K] extends object[] ? SelectModel<Unpack<M[K]>, T[K]>[] :
    M[K] extends object ? SelectModel<M[K], T[K]> : never
  )
}
