'use strict';

var app = {};
var __API_URL__ = 'http://localhost:5000';

(function(module) {
  function errorCallback(err) {
    console.error(err);
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

  Task.createTask = task =>
  $.post(`${__API_URL__}/tasks/add`, task)
    .then(() => page('/'))
    .catch(errorCallback);

  module.Task = Task;
})(app)
