import { Injectable } from '@nestjs/common';
import { UserData } from 'src/utils/type';

@Injectable()
export class UsersService {
  private users = [
    { name: 'ram', age: 55 },
    { name: 'hari', age: 57 },
  ];
  fetchUser() {
    return this.users;
  }

  createUser(userData: UserData) {
    this.users.push(userData);
  }

  getUserById(id: number) {
    return { id, name: 'John', age: 22 };
    // return null;
  }
}
