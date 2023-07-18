
import { Link } from "react-router-dom"

const InvalidShopper = () => {
    return(
        <div>
            <h3 className="text-danger">Invalid userId | Password</h3>
            <Link to="/login">Try again </Link>
        </div>
    )
}

export default InvalidShopper;