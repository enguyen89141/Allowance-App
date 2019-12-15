import React, { Component } from 'react'
import './AllowanceReceiverPage.css'

export default class AllowanceReceiverPage extends Component {
  render() {
    return (
      <div className="container">
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
            <h3>Finished?</h3>
            <p>
              <button>Mark</button>
            </p>
            <p>
              <button>Mark</button>
            </p>
          </div>
          <div className="paid">
            <h3>Allowance received?</h3>
            <p>Yes</p>
            <p>No</p>
          </div>
        </div>
      </div>
    )
  }
}