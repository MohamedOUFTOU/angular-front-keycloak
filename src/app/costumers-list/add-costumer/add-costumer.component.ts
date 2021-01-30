import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CostumerService} from '../../services/costumer-api/costumer.service';

@Component({
  selector: 'app-add-costumer',
  templateUrl: './add-costumer.component.html',
  styleUrls: ['./add-costumer.component.css']
})
export class AddCostumerComponent implements OnInit {

  costumerName = '';
  costumerEmail = '';
  isEditing = false;

  constructor(private costumerService: CostumerService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.costumerService.costumer != null) {
      console.log(this.costumerService.costumer);
      this.costumerName = (this.costumerService.costumer as any).name;
      this.costumerEmail = (this.costumerService.costumer as any).email;
      this.isEditing = true;
    }
  }

  onAddCostumer(): void {
    if (this.costumerName.length > 3 && this.costumerEmail.length > 6) {

      this.costumerService.addCostumer(this.costumerName, this.costumerEmail)
        .subscribe(data => {
          // console.log(data);
          this.router.navigate(['/costumers-list']);
        }, error => {
          console.error(error);
        });
    } else {
      alert('Please fill all the inputs in the form with valid entries !!!');
    }

  }

  onModifyCostumer(): void {

    if (this.costumerName.length > 3 && this.costumerEmail.length > 6) {
      const costumerId: number = (this.costumerService.costumer as any).id;
      console.log(costumerId);
      this.costumerService.modifyCostumer(this.costumerName, this.costumerEmail, costumerId)
        .subscribe(data => {
          console.log(data);
          this.costumerService.costumer = null;
          this.router.navigate(['/costumers-list']);
        }, error => {
          console.error(error);
        });
    } else {
      alert('Please fill all the inputs in the form with valid entries !!!');
    }
  }
}
