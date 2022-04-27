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


function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNav/>
      <Component {...pageProps}/>
    </>
    )
}

export default MyApp
