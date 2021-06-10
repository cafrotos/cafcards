import { ROUTES } from "configs";
import { AppContext } from "index"
import { useContext, useEffect, useMemo } from "react"
import { Redirect, Route } from "react-router-dom"

/**
 * 
 * @param {import("react-router").RouteProps} props 
 * @param {Boolean} props.private
 */
const PolicyRoute = (props) => {
  const { logined } = useContext(AppContext);

  useEffect(() => {
    if (props.title) {
      document.title = props.title
    }
  }, [])

  const _component = useMemo(() => {
    if (props.private) {
      if (logined) {
        return props.component
      }
      return () => (
        <Redirect
          to={ROUTES.LOGIN}
        />
      )
    }
    if (!logined) {
      return props.component
    }
    return () => (
      <Redirect
        to={ROUTES.HOME}
      />
    )
  }, [logined, props.component, props.private])

  return (
    <Route
      {...props}
      component={_component}
    />
  )
}


export default PolicyRoute