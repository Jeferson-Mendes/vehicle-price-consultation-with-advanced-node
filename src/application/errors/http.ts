export class BadRequestError extends Error {
  constructor (message?: string) {
    super('BadRequest')
    this.name = 'BadRequestError'
    if (message != null) this.message = message
  }
}

export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
  }
}

export class ConnectionNotFoundError extends Error {
  constructor () {
    super('Connection not found')
    this.name = 'ConnectionNotFoundError'
  }
}
