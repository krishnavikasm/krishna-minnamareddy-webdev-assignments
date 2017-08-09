var sortable = function($scope, element, attrs) {
  var initial, final;
  var model = $scope.model;
  $(element).sortable({
    start: function(event, ui) {
      initial = ui.item.index();
    },
    update: function(event, ui) {
      final = ui.item.index();
      model.updateIndex(initial, final);
    }
  });
};
