import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AddproductService } from '../services/addproduct.service';
import { Products } from '../../../datatype';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  constructor(private route:Router,private product:AddproductService){}
  sellerName='';
  menuType:string='default';
  searchResult:undefined|Products[];

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
        this.menuType='seller';
        if(localStorage.getItem('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData= sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }}
        else {
          this.menuType='default';
        }
      }
    })
  }


  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element= query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
       console.warn(result)
       this.searchResult=result
      })
    }
    
  }

hidesearch(){
  this.searchResult=undefined
}

submitSearch(value:string){
  // console.log(val);
  this.route.navigate([`app-search/${value}`]);
}


}


