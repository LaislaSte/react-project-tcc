import { checkActionCode } from "firebase/auth";
import React from "react";
import { useState } from "react";
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

  disableCB = (element) => {
    // var checkBoxes = document.querySelectorAll(".checkbox");
    // var selecionados = 0;
    // checkBoxes.forEach(function (el) {

    //   if (el.checked) {
    //     selecionados++;
    //   }

    // });

    // const selecionados = this.state.workDays;
    // console.log(selecionados);
    // console.log(element);
    // if (selecionados >= 5) {
    //   if (element.unchecked) {
    //     return true
    //   }
    // }

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
                      // disabled={this.disableCB(this)}
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

// const CheckBox = () => {

//   const [categorys, setCategorys] = useState([]);

//   const handleCheckboxChange = (event) => {
//     let newArray = [...categorys, event.target.value];
//     if (categorys.includes(event.target.value)) {
//       newArray = newArray.filter(day => day !== event.target.value);
//     }
//     setCategorys(newArray)
//   };

//   const disableCB = (element) => {
//     var checkBoxes = document.querySelectorAll(".checkbox");
//     var selecionados = 0;
//     checkBoxes.forEach(function (el) {

//       if (el.checked) {
//         selecionados++;
//       }

//     });
//     console.log(selecionados);
//     if (selecionados >= 5) {
//       if (element.unchecked) {
//         return true
//       }
//     }

//   }

//   console.log(categorys);

//   return (
//     <div>
//       <form>
//         <div>
//           <h5>Select your workday(s):</h5>
//           <div className="checked-boxes-container">
//             {categorys.map((item, index) => {
//               return (
//                 <div className="form-checked-box" key={index}>
//                   <input
//                     type="checkbox"
//                     className="custom-control-input"
//                     id={item.id}
//                     value={item.name}
//                     disabled={disableCB(this)}
//                     // checked={disableCB(this)}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label className="custom-control-label" htmlFor="monday">
//                     {item.name}
//                   </label>

//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </form>
//       <button>Save settings</button>
//     </div>
//   )
//   }

export default CheckBox;
