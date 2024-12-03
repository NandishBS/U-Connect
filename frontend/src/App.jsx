import { useDispatch, useSelector } from "react-redux";
import {changeMessage} from './store/services/helloSlice.js'
import Container from "./components/generalComponents/Container.jsx";
import BlueButton from "./components/generalComponents/BlueButton.jsx";

function App() {
  const message = useSelector(state => state.hello.message);
  const user = useSelector(state => state.hello.user)
  const dispatch = useDispatch();

  const clickHandler = ()=>{
    dispatch(changeMessage({
      user : "nandishbs"
    }))
  }

  return (
    <div className="App bg-black text-white flex h-screen justify-center items-center min-w-full">
      <Container className="" message="hello how are you">
      <h1>welcome to U-Connect</h1>
        <BlueButton/>
      </Container>
    </div>
  );
}

export default App;
