import { checkActionCode } from "firebase/auth";
import React from "react";
import { categorys } from "../../utils/arraysHeader";
import './CheckBox.css';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workStart: 8,
      disable: false,
      workEnd: "",
      workDays: []
    };
  }

  disableCB = (index) => {
    let newArray = [...this.state.workDays];


    if (newArray.length >= 5) {
      const checkedBoxes = document.querySelectorAll('input[type=checkbox]');
      const uncheckedBoxes = document.querySelectorAll('input[type=checkbox]:unchecked');

      checkedBoxes.forEach(i => {
        if (i === uncheckedBoxes) {
          return
        }

      })

      if (index === '') {
        return true
      }
    }
    return;
  }

  handleCheckboxChange = event => {
    let newArray = [...this.state.workDays, event.target.value];
    if (this.state.workDays.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    this.setState({
      workDays: newArray
    });
  };

  render() {
    console.log(this.state.workDays);
    return (
      <div>
        <form>
          <div>
            <h5>Select your workday(s):</h5>
            <div className="checked-boxes-container">
              {categorys.map((item, index) => {
                return (
                  <div className="form-checked-box" key={index}>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={item.id}
                      value={item.name}
                      disabled={this.disableCB(index)}
                      checked={this.disableCB(index)}
                      onChange={this.handleCheckboxChange}
                    />
                    <label className="custom-control-label" htmlFor="monday">
                      {item.name}
                    </label>

                  </div>
                )
              })}
            </div>
          </div>
        </form>
        <button>Save settings</button>
      </div>
    );
  }
}

export default CheckBox;
