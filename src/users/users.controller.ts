import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users') // users
export class UsersController {

    @Get()
    findAll(@Query('role') role?: 'admin' | 'user') {
        return [];
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return {id};
    }

    @Post()
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')
    findOneAndUpdate(@Param('id') id: string, @Body() user: {}) {
        return {id, ...user};
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return {id};
    }
}
