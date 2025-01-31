import AuthService from '../api/auth/auth';
import { JwtPayload } from 'jwt-decode';

export default function Nav() {
    return (
        <nav>
            <ul>
                <li><a href="/wiki">Wiki Home</a></li>
                <li><a href="/">Return to Map</a></li>
                <li><a href="/wiki/login">Login or Register</a></li>
            </ul>
        </nav>
    )
}