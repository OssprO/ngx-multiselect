import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-multiselect',
  templateUrl: './ngx-multiselect.component.html',
  styleUrls: ['./ngx-multiselect.component.css']
})
export class NgxMultiselectComponent implements OnInit {
  @Input() options:any[];
  //@Input() displayProp:;
  //@Input() idProp:;
  @Input() searchLimit:number = 25;
  @Input() selectionLimit:number = 0;
  @Input() showSelectAll:boolean = false;
  @Input() showUnselectAll:boolean = false;
  @Input() showSearch:boolean = false;
  @Input() searchFilter:string = '';
  @Input() disabled:string = '';
  //@Input() labels:;
  @Input() classesBtn:object = {'btn-block btn-default':true};
  //@Input() showTooltip:;
  @Input() placeholder:string = '';


  private selectedOptions:any[] = [];
  private unselectedOptions:any[] = [];
  private open:boolean = false;

  private resolvedOptions = [];

  constructor() {
    //document.on('click', this.closeHandler);
    this.options = [ 'Option 01', 'Option 02', 'Option 03' ];
  }

  ngOnInit() {
    console.log(this.selectionLimit);
  }

  toggleDropdown () {
      this.open = !this.open;
      this.resolvedOptions = this.options;
      //updateSelectionLists();
  };

  getButtonText() {
    return 'Select';
    /*
    if ($scope.selectedOptions && $scope.selectedOptions.length === 1) {
        return $scope.getDisplay($scope.selectedOptions[0]);
    }
    if ($scope.selectedOptions && $scope.selectedOptions.length > 1) {
        var totalSelected = angular.isDefined($scope.selectedOptions) ? $scope.selectedOptions.length : 0;
        if (totalSelected === 0) {
            return $scope.labels && $scope.labels.select ? $scope.labels.select : ($scope.placeholder || 'Select');
        } else {
            return totalSelected + ' ' + ($scope.labels && $scope.labels.itemsSelected ? $scope.labels.itemsSelected : 'selected');
        }
    } else {
        return $scope.labels && $scope.labels.select ? $scope.labels.select : ($scope.placeholder || 'Select');
    }
    */
  }

  closeHandler(event) {
    /*
      if (!$element[0].contains(event.target)) {
          $scope.$apply(function () {
              $scope.open = false;
          });
      }
      */
  };

  updateSelectionLists () {
      if (!$ngModelCtrl.$viewValue) {
          if (this.selectedOptions) {
              this.selectedOptions = [];
          }
          this.unselectedOptions = this.resolvedOptions.slice(); // Take a copy
      } else {
          this.selectedOptions = this.resolvedOptions.filter(function (el) {
              var id = $scope.getId(el);
              for (var i = 0; i < $ngModelCtrl.$viewValue.length; i++) {
                  var selectedId = $scope.getId($ngModelCtrl.$viewValue[i]);
                  if (id === selectedId) {
                      return true;
                  }
              }
              return false;
          });
          this.unselectedOptions = this.resolvedOptions.filter(function (el) {
              return this.selectedOptions.indexOf(el) < 0;
          });
      }
  };

  private getId(item) {
      if (typeof(item) === 'string') {
          return item;
      } else if (typeof(item) === 'object') {
          if ($scope.idProp) {
              return multiselect.getRecursiveProperty(item, $scope.idProp);
          } else {
              //$log.error('Multiselect: when using objects as model, a idProp value is mandatory.');
              return '';
          }
      } else {
          return item;
      }
  };

  private getDisplay(item) {
      if (typeof(item) === 'string') {
          return item;
      } else if (typeof(item) === 'object') {
          if ($scope.displayProp) {
              return multiselect.getRecursiveProperty(item, $scope.displayProp);
          } else {
              $log.error('Multiselect: when using objects as model, a displayProp value is mandatory.');
              return '';
          }
      } else {
          return item;
      }
  };

  isSelected(item) {
      if (!this.selectedOptions) {
          return false;
      }
      var itemId = this.getId(item);
      for (var i = 0; i < this.selectedOptions.length; i++) {
          var selectedElement = this.selectedOptions[i];
          if (this.getId(selectedElement) === itemId) {
              return true;
          }
      }
      return false;
  };


}
