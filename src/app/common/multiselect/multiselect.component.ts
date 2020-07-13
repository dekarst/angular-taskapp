import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export interface Option {
  name: string,
  id: any,
  image?: string,
  disabled?:boolean
}
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
  @Input() placeholder:string;
  @Input() items: Array<Option>;
  @Output() selection: EventEmitter<Option[]> = new EventEmitter();
  @Input() selectedItems = [];
  isSelectDisabled = false
  constructor() {
    this.selectedItems = this.selectedItems ? this.selectedItems: [5];
    // this.items = [
    //   { id: 1, name: 'Python', image: 'python.jpg' },
    //   { id: 2, name: 'Node Js', image: 'nodejs.jpg' },
    //   { id: 3, name: 'Java', image: 'java.jpg' },
    //   { id: 4, name: 'PHP', image: 'php.jpg', disabled: true },
    //   { id: 5, name: 'Django', image: 'django.jpg' },
    //   { id: 6, name: 'Angular', image: 'angular.jpg' },
    //   { id: 7, name: 'Vue', image: 'vue.jpg' },
    //   { id: 8, name: 'ReactJs', image: 'reactjs.jpg' },
    // ];
  }

  ngOnInit(): void {
  }
  onChange($event){
    console.log($event)
    this.selection.emit($event._id)
  }
}
