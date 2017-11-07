'use strict';

var app = app || {};

(function(module) {
  const taskView = {};

  taskView.initIndexPage = function() {
    $('.container').hide();
    $('.task-view').show();
    app.Task.all.map(task => $('#task-list').append(task.toHtml()));
  }

  module.taskView = taskView;
})(app)

$(function() {
  app.Task.fetchAll(app.taskView.initIndexPage);
})
