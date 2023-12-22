import { Component , ElementRef, ViewChild} from '@angular/core';

declare const bootstrap: any; 

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @ViewChild('errorToast') errorToast: ElementRef | undefined;

  categories  = [
    {
      "category": "Dashboard",
      "subCategory": [
        {"label": "SOP", "role": "SOP_A_VIEW"},
        {"label": "SOP-V2", "role": "SOP_A_V2"},
        {"label": "QSOP", "role": "QSOP_V_VIEW"}
      ]
    },
    {
      "category": "User",
      "subCategory": [
        {"label": "Add User", "role": "USR_M_ADD"},
        {"label": "Edit User", "role": "USR_M_ADD"},
        {"label": "Delete User", "role": "USR_D"}
      ]
    },
    {
      "category": "Master",
      "subCategory": [
        {"label": "Shift Master", "role": "SHIFT_M_ADD"},
        {"label": "Machine", "role": "MACHN_M_VIEW"},
        {"label": "Component Master", "role": "COMP_M_VIEW"}
      ]
    },
    {
      "category": "Test",
      "subCategory": [
        {"label": "Test", "role": "TEST_M_ADD"}
      ]
    }
  ];

  ngOnInit() {

  }

  selectedCategory: any = null;
  selectedSubCategory: any = null;
  newRole: string = ''; 
  enteredValues: { [key: string]: string[] } = {};
  enteredValue: string = '';
  showerror : boolean = false;

  showSubCategories(category: any) {
    this.selectedCategory = category;
    this.selectedSubCategory=''
  }

  showRoles(subCategory: any) {
    this.selectedSubCategory = subCategory;
  }

  addValue(value: string) {

    if (this.enteredValue.trim()) {
    
      if (this.selectedSubCategory) {
        if (!this.enteredValues[this.selectedSubCategory.label]) {
          this.enteredValues[this.selectedSubCategory.label] = [];
        }
        this.enteredValues[this.selectedSubCategory.label].push(value);
        this.enteredValue = '';
      }
    }else{
      this.showErrorToast();
    }
    
   
  }

  removeValue(subCategoryLabel: string, index: number) {
    if (this.enteredValues[subCategoryLabel]) {
      this.enteredValues[subCategoryLabel].splice(index, 1);
    }
  }


  showErrorToast() {
    const toastElement = document.querySelector('.toast');
    if (toastElement) {
      const bsToast = new bootstrap.Toast(toastElement);
      bsToast.show();

      // Close the toast after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        bsToast.hide();
      }, 3000);
    }
  }
}
