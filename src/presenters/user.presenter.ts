import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities';

const userPresenterExample: UserPresenter = {
  id: '63d2e28f18828f9cc35369aa',
  email: 'albert@gmail.com',
};

export class UserPresenter {
  @ApiProperty({
    description: 'User ID.',
    example: userPresenterExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'User email.',
    example: userPresenterExample.email,
  })
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
  }
}
