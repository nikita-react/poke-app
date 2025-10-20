import supabase from "../../../client"



const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout error:", error.message);
    } else {
        console.log("User logged out successfully");
    }
};


export default logout;