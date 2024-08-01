import "../styles/globals.css";
import "../components/button.css"
import "../components/logine.css"
import "../components/tets.css"
import "../components/por.css"




import Layout from "../components/layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
