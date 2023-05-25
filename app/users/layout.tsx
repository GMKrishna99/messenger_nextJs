import Sidebar from "../components/Sidebar/Sidebar";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        // @ts-expect-error server component
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}

// reason to create this file in feature we can fetch data from database