// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AddproductService } from '../services/addproduct.service';
// import { Products } from '../../../datatype';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './search.component.html',
//   styleUrl: './search.component.scss'
// })
// export class SearchComponent implements OnInit {

//   searchResult:undefined|Products[]

//   constructor(private activeRoute:ActivatedRoute,private product:AddproductService){}

//   ngOnInit(): void {
//     let query=this.activeRoute.snapshot.paramMap.get('query')
//     console.warn(query)
//     if(query){
//      this.product.searchProducts(query).subscribe((result)=>{
//       this.searchResult=result;
//      }
//     )}
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddproductService } from '../services/addproduct.service';
import { Products } from '../../../datatype';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'] // Corrected styleUrls from styleUrl
})
export class SearchComponent implements OnInit {
  
  searchResult: undefined | Products[];

  constructor(private activeRoute: ActivatedRoute, private product: AddproductService) {}

  ngOnInit(): void {
    // Subscribe to route parameters
    this.activeRoute.paramMap.subscribe(params => {
      const query = params.get('query');
      console.warn(query);
      if (query) {
        this.product.searchProducts(query).subscribe(result => {
          this.searchResult = result;
        });
      }
      
    });
  }
}

