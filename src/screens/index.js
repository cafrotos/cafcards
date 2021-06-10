import PolicyRoute from "components/PolicyRoute"
import { ROUTES } from "configs"
import { BrowserRouter } from "react-router-dom"
import AddCard from "./AddCard"
import Home from "./Home"
import Login from "./Login"

const Screens = () => {
  return (
    <BrowserRouter>
      <PolicyRoute
        title="Từ vựng"
        private={false}
        path={ROUTES.LOGIN}
        component={Login}
      />
      <PolicyRoute
        private={true}
        exact
        path={ROUTES.HOME}
        component={Home}
      />
      <PolicyRoute
        private={true}
        exact
        path={ROUTES.ADD_WORD}
        component={AddCard}
      />
    </BrowserRouter>
  )
}

export default Screens