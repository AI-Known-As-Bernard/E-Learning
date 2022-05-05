/*
_app.js
Next.js uses the App component to initialize the pages
This app compononent runs before any page get readt for users to see
This is a perfect place to add your bootstrap css os that it is available for the 
*/
import TopNav from '../components/TopNav'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from '../context/index'
import '../styles/topNav.css'
//By default toast messages will appear in the top right corner of the browser page



function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center"/>
      <TopNav/>
      <Component {...pageProps}/>
    </Provider>
    )
}

export default MyApp
