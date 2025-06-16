import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: string[] = [];

    getAllTasks(): string[] {
        return this.tasks;
    }

    createTask(task: string): void {
        this.tasks.push(task);
    }

    deleteTask(task: string): boolean {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
