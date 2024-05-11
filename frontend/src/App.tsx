import { BrowserRouter,Route,Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Allblogs from "./pages/Allblogs";
import Createblog from "./pages/Createblog";
import Update from "./pages/Update";

function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:postid" element={<Blog />} />
      <Route path="/allblog" element={<Allblogs />} />
      <Route path="/createblogs" element={<Createblog />} />
      <Route path="/update/:id" element={<Update />} />


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;