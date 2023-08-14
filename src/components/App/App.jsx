import { Component } from "react";
import { createId } from "@paralleldrive/cuid2";

import AppInfo from "../AppInfo/AppInfo";
import SearchPanel from "../SearchPanel/SearchPanel";
import AppFilter from "../AppFilter/AppFilter";
import EmployeesList from "../EmployeesList/EmployeesList";
import EmployeesAddForm from "../EmployeesAddForm/EmployeesAddForm";

import "./App.css";

class App extends Component {
  state = {
    data: [
      {
        name: "Ivan Sheremeta",
        salary: 8000,
        increase: false,
        id: 1,
        rise: false,
      },
      {
        name: "Taras Reznik",
        salary: 3000,
        increase: false,
        id: 2,
        rise: false,
      },
      {
        name: "Rostyslav Pryputnenko",
        salary: 3800,
        increase: false,
        id: 3,
        rise: false,
      },
      {
        name: "Stanislav Codes",
        salary: 10800,
        increase: false,
        id: 4,
        rise: false,
      },
    ],
    term: "",
    filter: "",
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: createId(),
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [prop]: !item[prop],
          };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.lemgth === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };
  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    let employeesListComponent = null;
    if (visibleData.length === 0) {
      employeesListComponent = <h2>No employees found.</h2>;
    } else {
      employeesListComponent = (
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
      );
    }
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />;
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        {employeesListComponent}
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
export default App;
