export interface Project {
    _id:string,
    title: string,
    description: string,
    start_date: Date,
    end_date: Date,
    responsible_persons: Array<any>,
    documents: Array<any>
  }