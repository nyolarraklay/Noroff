import { useRouteError } from "react-router-dom"

function RouteNotFound() {
    const error = useRouteError()
    console.log(error)

    return (
      <div>
        <h1>Oooops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
  }

export default RouteNotFound