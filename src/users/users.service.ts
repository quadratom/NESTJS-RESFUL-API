import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id" : 1,
            "name" : "moses oyeniyi",
            "email" : "mosesoyo@gmail.com",
            "role" : "ADMIN"
        },
        {
            "id" : 2,
            "name" : "ade ola",
            "email" : "ola@gmail.com",
            "role" : "ENGINEER"
        },
        {
            "id" : 3,
            "name" : "quadri leke",
            "email" : "qua@gmail.com",
            "role" : "INTERN"
        },
        {
            "id" : 4,
            "name" : "joti boton",
            "email" : "jojo@gmail.com",
            "role" : "ENGINEER"
        },
        {
            "id" : 5,
            "name" : "light oguns",
            "email" : "oguns@gmail.com",
            "role" : "ENGINEER"
        }
    ]

    findAll(role ?: 'ENGINEER' |'ADMIN' | 'INTERN' ) {
        if(role){
            const roleArrays =  this.users.filter(user => user.role === role)

            if (roleArrays.length === 0) throw new NotFoundException('User Role Not Found')
            return roleArrays
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User Not Found')

        return user
    }

    create(createUserDto : CreateUserDto) {
        const usersByHightestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUsers = {
            id : usersByHightestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUsers)
          return newUsers
    }

    update(id : number, updateUserDto : UpdateUserDto) {
            this.users = this.users.map(user => {
                if(user.id === id) {
                    return {...user, ...updateUserDto}
                }
                    return user
            })
                  return this.findOne(id)
        }


    delete(id : number) {
        const removedUser  = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id )

        return removedUser

    }


}
