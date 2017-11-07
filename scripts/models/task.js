'use strict';

var app = app || {};
var __API_URL__ = 'https://todo-app-demo.github.io/todo-app-client';

(function(module) {
  function errorCallback(err) {
    module.errorView.initErrorPage(err);
  }

  function Task(taskObject) {
    Object.keys(taskObject).forEach(key => this[key] = taskObject[key]);
  }

  Task.prototype.toHtml = function() {
    let template = Handlebars.compile($('#task-template').text());
    return template(this);
  }

  Task.all = [];

  Task.loadAll = rows => {
   Task.all = rows.map(task => new Task(task));
  }

  Task.fetchAll = callback =>
    $.get(`${__API_URL__}/tasks`)
      .then(Task.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Task = Task;
})(app)
