import {Document} from './document';
export interface Project {
    project_id:number,
    name: string,
    title: string,
    description: string,
    start_date: string,
    end_date: string,
    manager: string,
    // [propName:string]:any
    documents?: Array<Document>
}
