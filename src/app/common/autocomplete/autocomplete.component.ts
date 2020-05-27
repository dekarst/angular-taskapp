import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Form, AbstractControl, Validators } from '@angular/forms';
import { map, filter, startWith } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomFormValidator as CustomFormValidator } from './custom_form_validators';

export interface Option {
  name: string
}
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnInit {
  @Output() selected: EventEmitter<Option[]> = new EventEmitter();
  @Output() query: EventEmitter<any> = new EventEmitter();

  @Input() selectedValue:any;
  @Input() options: Option[];
  @Input() label: string;
  @Input() formControlName: string;
  @Input() url: string = '';
  _formControl: FormControl;
  filteredOptions: Observable<Option[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      this._formControl = new FormControl('', [Validators.required, CustomFormValidator.valueSelected(this.options)]);
      this.filteredOptions = this._formControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterByName(name) : this.options.slice()),
        );
      if(this.selectedValue){
        let value = this.displayFn(this.selectedValue)
        this.setValue(value)
      }
      this.filteredOptions.subscribe(option => {
        this.selected.emit(option);
      })
    }, 1000)
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }
  private filterByName(name: string): Option[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => {
      return option.name.toLowerCase().indexOf(filterValue) === 0
    })
  }
  getData($event) {
    console.log(this._formControl.hasError('nomatches'))
    this.query.emit({ query: $event.target.value, hasError: this._formControl.hasError('nomatches') })
  }
  setValue(value: any) {
    this._formControl.setValue(value);
  }
}
