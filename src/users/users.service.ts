import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@gmail.com',
            role: 'admin'
        }, 
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@gmail.com',
            role: 'user'
        },
        {
            id: 3,
            name: 'Alice Smith',
            email: 'alice@gmail.com',
            role: 'user'
        },
        {
            id: 4,
            name: 'Bob Johnson',
            email: 'bob@gmail.com',
            role: 'user'
        },
        {
            id: 5,
            name: 'Charlie Brown',
            email: 'charlie@gmail.com',
            role: 'user'
        }
    ]

    findAll(role?: 'admin' | 'user') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => +user.id === id);
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: (this.users.length + 1),
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const index = this.users.findIndex(u => u.id === id);
        if (index > -1) {
            this.users[index] = { ...this.users[index], ...updateUserDto };
            return this.users[index];
        }
        return null;
    }

    delete(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index > -1) {
            const deletedUser = this.users[index];
            this.users.splice(index, 1);
            return deletedUser;
        }
        return null;
    }
}
