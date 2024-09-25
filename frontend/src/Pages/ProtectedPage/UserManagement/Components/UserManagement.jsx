import "./../Styles/UserManagement.css";

const UserManagement = () => {
    return (
        <div className={"user-management-page"}>
            <div className={"user-display-title title-user-management"}>
                <div>ID</div>
                <div>Email</div>
                <div>Position</div>
                <div>Role</div>
            </div>
            <div className={"users-holder"}>
                <div className={"user-display-title users-view"}>
                    <div>1</div>
                    <div>stephen.muiru22@students.dkut.ac.ke</div>
                    <div>ChairPerson</div>
                    <div>Admin</div>
                </div>

            </div>
        </div>
    );
};

export default UserManagement;