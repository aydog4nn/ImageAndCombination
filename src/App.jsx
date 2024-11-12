import Header from "./components/Header";
import Router from "./config/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {


    return (
        <div style={{
            backgroundColor: "#f7e7d4",
            height: "100vh",
        }}>

        <Header/>
        <Router />
        </div>

    );
}

export default App;
