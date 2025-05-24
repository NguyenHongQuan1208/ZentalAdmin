import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import LoginPage from "./screens/LoginPage";
import UserList from "./List/UserList";
import PostList from "./List/PostList";
import ReportList from "./List/ReportList";
import UserinfoEdit from "./Edit/UserinfoEdit";
import PostEdit from "./Edit/PostEdit";
import ReportEdit from "./Edit/ReportEdit";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider} // Thêm dòng này
      loginPage={LoginPage} // Thêm dòng này
    >
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
        edit={ReportEdit}
        options={{ label: "Reports" }}
      />
    </Admin>
  );
}

export default App;
