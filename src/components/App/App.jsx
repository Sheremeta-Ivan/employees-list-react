import AppInfo from "../AppInfo/AppInfo";
import SearchPanel from "../SearchPanel/SearchPanel";
import AppFilter from "../AppFilter/AppFilter";
import EmployeesList from "../EmployeesList/EmployeesList";
import EmployeesAddForm from "../EmployeesAddForm/EmployeesAddForm";
import "./App.css";
function App() {
  const data = [
    { name: "Ivan Sheremeta", salary: 8000, increase: false, id: 1 },
    { name: "Taras Reznik", salary: 3000, increase: true, id: 2 },
    { name: "Rostyslav Pryputnenko", salary: 3800, increase: false, id: 3 },
    { name: "Stanislav Codes", salary: 10800, increase: false, id: 4 },
  ];

  return (
    <div className="app">
      <AppInfo />;
      <div className="search-panel">
        <SearchPanel />
        <AppFilter />
      </div>
      <EmployeesList data={data} />
      <EmployeesAddForm />
    </div>
  );
}
export default App;
