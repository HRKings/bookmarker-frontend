import IBookmark from '@/types/IBookmark';
import ICategory from '@/types/ICategory';
import IPaginated from '@/types/IPaginated';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function api(path: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body?: any): Promise<Response> {
  return fetch(`${API_BASE_URL}/${path}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function getAllBookmarksPaginated(
  page: number = 1,
  pageSize: number = 20,
): Promise<IPaginated<IBookmark> | undefined> {
  const result = await api(`bookmark/all?page=${page}&pageSize=${pageSize}`, 'GET');

  if (result.status === 200) { return result.json(); }

  return undefined;
}

export async function getBookmarksPaginatedByCategory(
  categoryId: string,
  page: number = 1,
  pageSize: number = 20,
): Promise<IPaginated<IBookmark> | undefined> {
  const result = await api(`bookmark/${categoryId}?page=${page}&pageSize=${pageSize}`, 'GET');

  if (result.status === 200) { return result.json(); }

  return undefined;
}

export async function getAllCategoriesPaginated(
  page: number = 1,
  pageSize: number = 20,
): Promise<IPaginated<ICategory> | undefined> {
  const result = await api(`category/all?page=${page}&pageSize=${pageSize}`, 'GET');

  if (result.status === 200) { return result.json(); }

  return undefined;
}

export async function getTopLevelCategoriesPaginated(
  page: number = 1,
  pageSize: number = 20,
): Promise<IPaginated<ICategory>> {
  return (await api(`category/toplevel?page=${page}&pageSize=${pageSize}`, 'GET')).json();
}

export async function setBookmarkCategory(id: string, categoryId: string): Promise<boolean> {
  return (await api(`bookmark/${id}/category`, 'PUT', { category: categoryId })).status === 200;
}

export async function SearchBookmarks(
  query: string,
  categoryName: string | null,
  page: number = 1,
  pageSize: number = 20,
): Promise<IPaginated<IBookmark> | undefined> {
  const result = await api('bookmark/search', 'POST', {
    query,
    category: categoryName,
    page,
    pageSize,
  });

  if (result.status === 200) { return result.json(); }

  return undefined;
}

export async function CreateCategory(title: string, icon: string) {
  return (await api('category', 'POST', { title, icon })).status === 201;
}

export async function DeleteCategory(id: string) {
  return (await api(`category/${id}`, 'DELETE', null)).status === 200;
}
