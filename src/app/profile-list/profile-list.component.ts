import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageItem } from '../models/storage-item';
import content from '../../content/content.json';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {

  @Input() profiles:StorageItem[];

  @Output() selectProfile: EventEmitter<any> = new EventEmitter<any>();
  @Output() createProfile: EventEmitter<any> = new EventEmitter<any>();

  content = content;

  constructor() { }

  ngOnInit() { }

  emitProfile(event:Event,profile):void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.selectProfile.emit(profile);
  }

  emitCreateProfile(){
    this.createProfile.emit();
  }
}
