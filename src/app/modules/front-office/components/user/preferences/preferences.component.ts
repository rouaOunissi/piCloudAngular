import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../../../services/interestService/interests.service';
import { Interest } from './Interest';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  interests: Interest[] = [];

  constructor(private interestService: InterestsService) { }

  ngOnInit() {
    this.interestService.getAllInterests().subscribe(
      (interests) => this.interests = interests,
      (error) => console.error('Error fetching interests:', error)
    );
  }
}
