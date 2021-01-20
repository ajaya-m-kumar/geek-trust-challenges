import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindFalconeService } from '../find-falcone/find-falcone.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  route = [''];
  searchResult:any = {status: 'loading', timeTaken: 0, planet_name: null};
  constructor(private findingFalconeService: FindFalconeService, private router: Router) {
    this.searchResult = this.findingFalconeService.getSearchResult();
    if(!this.searchResult.status){
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
  }

}
