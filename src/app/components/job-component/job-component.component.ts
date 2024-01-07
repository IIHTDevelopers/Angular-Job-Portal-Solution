import { Component, OnInit } from '@angular/core';

interface Job {
  id: number;
  title: string;
  description: string;
  salary: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-job-component',
  templateUrl: './job-component.component.html',
  styleUrls: ['./job-component.component.css']
})
export class JobComponentComponent {
  jobs: Job[] = [];
  newJob: Job = {} as Job;
  editedJob: Job = {} as Job;
  isEditing = false;
  searchKeyword = '';

  ngOnInit(): void {
  }

  addJob(): void {
    this.newJob.id = this.jobs.length + 1;
    this.jobs.push({ ...this.newJob });
    this.newJob = {} as Job;
  }

  editJob(job: Job): void {
    this.isEditing = true;
    this.editedJob = { ...job };
  }

  saveEditedJob(): void {
    const index = this.jobs.findIndex(job => job.id === this.editedJob.id);
    if (index !== -1) {
      this.jobs[index] = { ...this.editedJob };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedJob = {} as Job;
  }

  deleteJob(job: Job): void {
    this.jobs = this.jobs.filter(item => item.id !== job.id);
  }

  get filteredJobs(): Job[] {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
