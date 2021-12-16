export type ResourcesData<T> = {
    id: number
    attributes: T
}
  
export type Resources<T> = {
    data: T
    meta?: any
}