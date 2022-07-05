export default interface IPaginated<T> {
  content: T[],
  page: number,
  itemsPerPage: number,
  totalPages: number,
  totalItems: number,
  hasNext: boolean,
}
