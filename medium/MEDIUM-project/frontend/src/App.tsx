import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Blog } from "./pages/blog"
import { Blogid } from "./pages/blogid"
import { Create } from "./pages/create"
import { Show } from "./component/show"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Show />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/show" element={<Blogid />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/create" element={<Create />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
