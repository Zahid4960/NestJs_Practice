import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('signup')
    signUp(
        @Body() userDto: CreateUserDTO
    ): Promise<User> {
        return this.userService.create(userDto);
    }

    @Post('login')
    login(
        @Body() loginDTO: LoginDTO
    ) {
        return this.authService.login(loginDTO);
    }
}
