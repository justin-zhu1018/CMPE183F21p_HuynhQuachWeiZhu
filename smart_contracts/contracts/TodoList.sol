// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; // Solidity Version definition

contract TodoList { // Contract name
  struct Task {
    uint id; //unsigned int
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks; // Key-value mapping structure for tasks (id => Task)
  uint public taskCount; // Keep track of number of tasks in todoList

  // Run every time contract is deployed
  constructor() {
    taskCount = 0;
    createTask('Predeployed Task 1');
  }

  // Events are useful to know when things are done (states)
  event TaskCreated (uint id, string content, bool completed);
  event TaskCompleted (uint id, bool completed);
  function createTask(string memory _content) public {
    // id is determined by taskCount
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false); // Broadcast an event that this task was created
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }
}
