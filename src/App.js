// src/App.js
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import UserList from "./List/UserList";

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="userInfo"
        list={UserList}
        options={{ label: "User List" }}
      />
    </Admin>
  );
}

export default App;
