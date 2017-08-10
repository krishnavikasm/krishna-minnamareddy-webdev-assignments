var sortable = function($scope, element, attrs) {
  var initial, final;
  // jquery code 
  // var model = $scope.model;
  // $(element).sortable({
  //   start: function(event, ui) {
  //     initial = ui.item.index();
  //   },
  //   update: function(event, ui) {
  //     final = ui.item.index();
  //     model.updateIndex(initial, final);
  //   }
  // });
  var model = $scope.model;
  Sortable.create(element[0], { onEnd: function(event) {
    initial = event.oldIndex;
    final = event.newIndex;
    model.updateIndex(initial, final);
  } });
};
