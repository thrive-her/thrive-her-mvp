import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import LogoutButton from "../components/LogoutButton";

function Events() {
const { userInfo } = usePassageUserInfo();
    
    return (
        <PassageAuthGuard
            unAuthComp={
                <div>
                    <div>you must be logged in</div>
                    <div>
                        <a href="/">Login</a>
                    </div>
                </div>
            }
        >
                <div>This is Events Page</div>
                    <p>Welcome, {userInfo?.email} </p>
                <LogoutButton />
        </PassageAuthGuard>
    );
}

export default Events;