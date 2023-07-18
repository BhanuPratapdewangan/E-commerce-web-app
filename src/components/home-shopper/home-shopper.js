
import {useCookies} from 'react-cookie';
const HomeShopper = () => {

    const [cookies, setCookies, removeCookies] = useCookies();

    return(
        <div>
            <h3>Home Shopper component</h3> <span>Welcome {cookies["userId"]}</span>
            <div className="d-flex flex-wrap justify-content-between mt-4">
                <img src="../image/hard_disk.jpg" width={300} height={260}></img>
                <img src="../image/jacket.jpg" width={300} height={260}></img>
                <img src="../image/jewellery.jpg" width={300} height={260}></img>
                <img src="../image/womens_jacket.jpg" width={300} height={260}></img>
            </div>
        </div>
    )
}

export default HomeShopper;