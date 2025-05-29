import { auth } from "../helper/firebase"

function Home(){

    function signOut(){
        auth.signOut()
    }

    return <div>
        <p>
            Logged in as: {auth.currentUser ? auth.currentUser.email : "Error: User Not Logged In"}
        </p>
        <button onClick={signOut}>
            Sign Out
        </button>
    </div>
}

export default Home