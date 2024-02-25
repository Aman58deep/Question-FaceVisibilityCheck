import { useState } from 'react'
import FaceDetect from "./components/FaceDetect"
import Home from "./components/Home"
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/",
  element: <FaceDetect/>},
  {path:"/home",
   element:<Home/>}
]);

function App() {
  const [count, setCount] = useState(0)

    return (
      <>
      <RouterProvider router={router}></RouterProvider>
      </>
    )
}

export default App
