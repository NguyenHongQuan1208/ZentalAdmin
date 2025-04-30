// src/App.js
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import UserList from "./List/UserList";
import PostList from "./List/PostList";
import ReportList from "./List/ReportList";
import { UserinfoEdit } from "./Edit/UserinfoEdit";
import PostEdit from "./Edit/PostEdit";

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="userInfo"
        list={UserList}
        edit={UserinfoEdit}
        options={{ label: "User List" }}
      />
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        options={{ label: "Posts" }}
      />
      <Resource
        name="reports"
        list={ReportList}
        options={{ label: "Reports" }}
      />
    </Admin>
  );
}

export default App;
