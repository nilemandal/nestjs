import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    console.log('Creating employee with data:', createEmployeeDto);
    console.log('Database service available:', !!this.databaseService);
    
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    })
  }

  findAll() {
    return this.databaseService.employee.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
  });
  };

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}
