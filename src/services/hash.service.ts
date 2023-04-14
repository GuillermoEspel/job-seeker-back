import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly SALT = 10;

  public hash(value: string): string {
    return hashSync(value, this.SALT);
  }

  public compare(value: string, hashedValue: string): boolean {
    return compareSync(value, hashedValue);
  }
}
