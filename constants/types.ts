export interface BaseResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface BaseListResponse<T> {
  success: boolean
  pagination: Pagination
  message: string
  totalCount: number
  data: T[]
}

export interface Pagination {
  totalItems: number
  currentPage: number
  totalPages: number
  pageLeft: number
}