import { Layout } from 'antd';
// const { Header, Footer, Sider, Content } = Layout;
import Headers from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';
import TenantDetail from './pages/TenantDetail';
import TenantAdd from './pages/TenantAdd';

function App() {

  return (
    <>

    <Headers/>
    <Routes>
      <Route path="/" element={<Content/>}/>
      <Route path="/tenant/:id" element={<TenantDetail/>}/>
      <Route path="/tenant/add" element={<TenantAdd/>}/>
    </Routes>
    <Footer/>

    </>
  )
}

export default App
