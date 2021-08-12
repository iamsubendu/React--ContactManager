import React from "react";

//class component
class AddContact extends React.Component {
  //we can aslo create a state directly without using hook
  state = {
    name: "",
    email: "",
  };

  add = (e) => {
    e.preventDefault();
    //to stop refreshing the page at each event
    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are necessary");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    //as we save , we need to clear our data
    this.props.history.push("/");
    //redirect and history push with data
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
