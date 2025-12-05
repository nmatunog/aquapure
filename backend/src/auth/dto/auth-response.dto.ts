// Authentication Response DTO
// Following coding standards: Rule 13

export class AuthResponseDto {
  user: {
    id: string
    name: string
    team: string
  }
  token: string
  refreshToken?: string
}

