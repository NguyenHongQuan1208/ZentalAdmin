// src/App.js
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import UserList from "./List/UserList";
import PostList from "./List/PostList";
import ReportList from "./List/ReportList";

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="userInfo"
        list={UserList}
        options={{ label: "User List" }}
      />
      <Resource name="posts" list={PostList} options={{ label: "Posts" }} />
      <Resource
        name="reports"
        list={ReportList}
        options={{ label: "Reports" }}
      />
    </Admin>
  );
}

export default App;
