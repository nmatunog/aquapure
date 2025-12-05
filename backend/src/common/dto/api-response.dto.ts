// Standard API Response DTO
// Following coding standards: Rule 5, Rule 13

export class ApiResponseDto<T> {
  data: T
  message?: string
  success: boolean

  constructor(data: T, message?: string) {
    this.data = data
    this.message = message
    this.success = true
  }
}

