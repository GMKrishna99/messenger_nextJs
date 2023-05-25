import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSideBar from "./DesktopSideBar"
import MobileFooter from "./MobileFooter"

async function Sidebar({ children }: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser();

    return (
        <div className="h-full">
            <DesktopSideBar currentUser={currentUser!} />
            {/* <MobileSideBar /> */}
            <MobileFooter />
            <main className="lg:pl-20 h-full bg-slate-100">
                {children}
            </main>
        </div>
    )
}

export default Sidebar

