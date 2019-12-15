import React, { Component } from 'react'
import './AllowanceGiverPage.css'

export default class AllowanceGiverPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="receivers">
          <h2>Select the person you'd like to view tasks for:</h2>
          <select>
            <option>Eric</option>
            <option>Daniel</option>
            <option>Martha</option>
          </select>
        </div>
        <div className="task_row">
          <div class="task">
            <h3>Task Name</h3>
            <p>Clean your room</p>
            <p>Finish TeamTreehouse Chapter 4 For Loops</p>
          </div>
          <div className="difficulty">
            <h3>Difficulty</h3>
            <p>2 stars</p>
            <p>4 stars</p>
          </div>
          <div className="reward">
            <h3>Reward</h3>
            <p>$4</p>
            <p>$8</p>
          </div>
          <div className="completed">
            <h3>Mark Rewarded</h3>
            <p>
              <button>Rewarded!</button>
            </p>
            <p>
              <button>Rewarded!</button>
            </p>
          </div>
          <div className="delete">
            <h3>Delete</h3>
            <p>
            <button>Delete</button>
            </p>
            <p>
            <button>Delete</button>
            </p>
          </div>
        </div>
        <div className="add_task_row">
          <h4>Add a task here!</h4>
          <div className="task">
            <input value="Task Name" />
          </div>
          <div className="difficulty">
            <select>
              <option>1 star</option>
              <option>2 stars</option>
              <option>3 stars</option>
              <option>4 stars</option>
              <option>5 stars</option>
            </select>
          </div>
          <div className="reward">
            <select>
              <option>$2</option>
              <option>$4</option>
              <option>$6</option>
              <option>$8</option>
              <option>$10</option>
            </select>
          </div>
          <div className="add">
            <button>Add Task!</button>
          </div>
        </div>
      </div>

    )
  }
}