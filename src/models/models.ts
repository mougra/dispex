export interface ServerResponse<T> {
  data: T[]
}

export interface IStreets {
  id: number
  prefix: {
    id: number
    name: string
    shortName: string
  }
  name: string
  cityId: number
  city: string
  nameWithPrefix: string
}
export interface IHouse {
  id: number
  name: string
  // Type: {
  //   Id: number
  //   Text: string
  // }
}
export interface IFlat {
  id: number
  flat: string
  typeId: number
  typeName: string
  name: string
}
export interface IClient {
  id: number
  name: string
  phone: number
  email: string
  bindId: string
}
