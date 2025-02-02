import {  Component, OnInit } from '@angular/core';
import { ProductService } from '../core/service/product.service';
import { Meal } from '../core/interface/Meal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meals',
  standalone: true,
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
  imports: [CommonModule],

})
export class MealsComponent implements OnInit {
  meals: { country: string; meal: Meal }[] = [];
  activeCategory: string = 'All';
  showMenu: boolean = false;

  categories: string[] = [
    'All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 
    'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'
  ];

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.fetchMeals(this.activeCategory);
  }

  fetchMeals(category: string): void {
    this.activeCategory = category;
    if (category === 'All') {
      this.productservice.getAllMealsByArea().subscribe({
        next: (res) => {
          this.meals = res.filter(Boolean);
        },
        error: (err) => {
          console.error('Error fetching meals:', err);
        }
      });
    } else {
      this.productservice.getMealsByCategory(category).subscribe({
        next: (res) => {
          this.meals = res?.meals?.map((meal: Meal) => ({
            country: meal.strArea || '',
            meal
          })) || [];
          
        }
      });
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}



