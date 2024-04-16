import { Component, OnInit } from '@angular/core';
import { groupService } from '../services/group.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent implements OnInit {
  query:string="I have expenses like Rs.5000 in traveling and Rs.4000 in food monthly. Can you provide me with financial recommendations?"
  constructor (private  GeminiSuggestions:groupService) {}

  ngOnInit(): void {
    this.GeminiSuggestions.SuggestionsByGemini(this.query).subscribe(
      (data) => {
        // Handle the data received from the API call
        console.log(data); // Log the data to see what you've received
        // Perform any other operations with the data as needed
      },
      (error) => {
        // Handle any errors that occur during the API call
        console.error('Error fetching suggestions:', error);
      }
    );
  }
  
}
