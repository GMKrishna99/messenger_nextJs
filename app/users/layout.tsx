import getUsers from "../actions/getUsers";
import Sidebar from "../components/Sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const user = await getUsers();
    return (
        // @ts-expect-error server component
        <Sidebar>
            <div className="h-full">
                <UserList
                    items={user}
                />
                {children}
            </div>
        </Sidebar>
    )
}

// reason to create this file in feature we can fetch data from database