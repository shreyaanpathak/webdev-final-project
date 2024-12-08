import { Link } from 'react-router-dom';
import Defaults from './Defaults'

export default function DefaultNavigation(){
    return(
        <div>
            <Link to="/Home">Home</Link>
            <Link to="/Account">Account</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <Defaults />
        </div>
    )
}