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
export interface IClientRes {
  id: number
  result: string
}

export interface IFormInput {
  name: string
  email: string
  phone: string
}
export interface IBind {
  adress: string
  client: string
}
