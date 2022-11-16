
import { Circles } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Loader.css';

const Loader = () => {

    return (
        <div className="loader-container">
            <Circles
                height="80"
                width="80"
                color="#04D939"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )

}

export default Loader