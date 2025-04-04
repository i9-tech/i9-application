import { Routes, Route } from 'react-router-dom';
import { Atendente } from './pages/Atendente/Atendente';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import { Funcionarios } from './pages/Funcionarios/Funcionarios';
import { Estoque } from './pages/Estoque/Estoque';
import { Cozinha } from './pages/Cozinha/Cozinha';

function App() {

  return (
    <>
    <main>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/atendente' element={<Atendente/>} />
        <Route path='/cozinha' element={<Cozinha/>} />
        <Route path='/estoque' element={<Estoque/>} />
        <Route path='/funcionarios' element={<Funcionarios/>} />
      </Routes>
    </main>
    </>
  )
}

export default App
