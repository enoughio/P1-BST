import ProtectedRoutes from "@/components/protected-routes";


export default function Layout({ children }) {
    return (
        <div>
            {/* Add any layout-specific elements here */}
           <ProtectedRoutes allowedRoles={['admin']} >

                <main>{children}</main>
           </ProtectedRoutes>
         
        </div>
    );
}



// TODO: Fix the sidebar error in this route
{/* <SidebarProvider>
<SidebarTrigger />
</SidebarProvider> */}