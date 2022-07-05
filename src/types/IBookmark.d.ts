export default interface IBookmark {
  id: string,
  url: string,
  pureUrl?: string,
  title?: string,
  description?: string,
  imageUrl?: string,
  imageAlt?: string,
  ogType?: string,
  videoUrl?: string,
  isLinkBroken: boolean,
  categoryId?: string,
}
