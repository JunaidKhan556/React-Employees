import React, { Component } from 'react';
import './App.css';
import swal from "sweetalert";

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: false,
      addForm: false,
      Email: 'admin@domain.com',
      Password: 'admin',
      inputEmail: '',
      inputPassword: '',
      users: [],
      edit: false,
      firstName: "",
      lastName: "",
      email2: "",
      salary: "",
      date: "",
      currentIndex: null
    }
    this.HandleLogin = this.Login.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }
  //**********************
  
  delete(index) {
    const { users } = this.state;
    users.splice(index, 1);
    this.setState({
      users
    });
  }

  edit(index) {
    const { users } = this.state;
      this.setState({
        addForm: true,
        user: true
      });
  
    this.setState({
      currentIndex: index,
      edit: true,
      enableForm: true,
      firstName: users[index].firstName,
      lastName: users[index].lastName,
      email2: users[index].email2,
      salary: users[index].salary,
      date: users[index].handleDate
    });
  }
  //addEmployee
  addEmployeeForm() {
    const {edit} = this.state;
    return (
      <div id="form">
        <div id="userForm" className="container">
          <h1 className="text-center">Add Employee</h1>
          {this.FirstName()}
          {this.LastName()}
          {this.Email2()}
          {this.Salary()}
          {this.JoiningDate()}
          <div className="text-center">
            {!edit ? (<button onClick={this.addUser} className="btn btn-success btn-block">Add</button>) : 
            (<button className="btn btn-info btn-block" onClick={this.updateTask}>Update</button>)}
          </div>
        </div>
      </div>
    );
  }
  JoiningDate() {
    return (
      <input value={this.state.date} onChange={this.setDate} type="date" placeholder="Date" className="form-control mb-3"/>
    );
  }
  Salary() {
    return (
      <input value={this.state.salary} onChange={this.setSalary} type="number" placeholder="Salary" className="form-control mb-3"/>
    );
  }
  Email2() {
    return (
      <input value={this.state.email2} onChange={this.setEmail2} type="email" placeholder="Email" className="form-control mb-3"/>
    );
  }
  LastName() {
    return (
      <input value={this.state.lastName} onChange={this.setLastName} type="text" placeholder="Last Name" className="form-control mb-3"/>
    );
  }
  FirstName() {
    return (
      <input value={this.state.firstName} onChange={this.setFirstName} type="text" placeholder="First Name" className="form-control mb-3"/>
    );
  }
  setFirstName = firstName => {this.setState({firstName: firstName.target.value});};

  setLastName = lastName => {this.setState({lastName: lastName.target.value});};

  setEmail2 = email2 => {this.setState({email2: email2.target.value});};

  setSalary = salary => {this.setState({salary: salary.target.value});};

  setDate = date => {this.setState({date: date.target.value});};
  
  addUser = () => {
    const { firstName, lastName, email2, salary, date, users } = this.state;
    users.push({
      firstName: firstName,
      lastName: lastName,
      email2: email2,
      salary: salary,
      date: date
    });
    this.setState({
      users,
      firstName: "",
      lastName: "",
      email2: "",
      salary: "",
      date: "",
      addForm: false
    });
  };
  //showTable
  showTable() {
    const { users } = this.state;
    return (
      <div id="showUsers" className="container">
      {console.log(users)}
      <div className="btn-group" id="button">
        <button className="btn btn-success" onClick={() => {this.setState({addForm: true});}}>Add Employee</button>
        <button className="btn btn-danger" onClick={() => {this.setState({addForm: false,user: false,users: []});}}>
          Logout
        </button>
        </div>
        <table className="table table-hover" id="table">
          <thead >
            <tr>
              <th>Index</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email2}</td>
                  <td>{user.salary}</td>
                  <td>{user.date}</td>
                  <td>
                    <div>
                        <span>
                          <button className="btn btn-sm btn-primary" onClick={this.edit.bind(this, index)}>Edit</button>
                        </span>
                    </div>
                  </td>
                  <td>
                    <div className="butt text-center">
                      <span>
                        <button className="btn btn-sm btn-danger" onClick={this.delete.bind(this, index)}>Delete</button>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  // Login
  setEmail = email => {
    this.setState({
      inputEmail: email.target.value
    });
  };

  setPassword = password => {
    this.setState({
      inputPassword: password.target.value
    });
  };

  Login() {
    if (this.state.inputEmail === this.state.Email && this.state.inputPassword === this.state.Password) 
    {
      swal("Welcome", "you are Logged In!", "success")
      .then(val => {this.setState({user: true});});
    } else {
      swal("Sorry", "Invalid email/password", "error");
    }
  };
renderLogin(){
  return(
    <div className="card-body" id="login">
      <h1 className="text-center" id="logintext">Login</h1>
      <div className="form-group">
        <input value={this.state.email} type="email" className="form-control" name="email" placeholder="admin@domain.com" onChange={this.setEmail}/>
      </div>
      <div className="form-group">
        <input value={this.state.password} type="password" name="password" className="form-control" id="password1" placeholder="admin" onChange={this.setPassword}/>
      </div>
      <button className="btn btn-primary" onClick={this.HandleLogin}>Login</button>
    </div>
  );
}
  render(){
    const {user, addForm } = this.state;

    return(
        <div>
          {!user && this.renderLogin()}
          {user && !addForm && this.showTable()}
          {user && addForm && this.addEmployeeForm()}
        </div>
    );
}

}
export default App;
