
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import NewForm from "./pages/NewForm"

export default function App() {
  /**
   * ! STATE (état, données) de l'application
   */


  /**
   * ! COMPORTEMENT (méthodes, fonctions) de l'application
   */


  /**
   * ! AFFICHAGE (render) de l'application
   */
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-form" element={<NewForm />} />
      </Routes>
    </>
  )
}