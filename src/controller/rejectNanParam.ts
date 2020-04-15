import { BadRequestError } from '@melmedia/http-errors';

export function rejectNanParam(param: string, value: number) {
  if (isNaN(value)) {
    throw new BadRequestError(`${param} must be a number`);
  }
}
