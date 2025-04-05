import ProtectedRoutes from "@/components/protected-routes";

export default function Layout({ children }) {
    return (
        <div>
            {/* Add any layout-specific elements here */}
           <ProtectedRoutes allowedRoles={['member']} >
                <main>{children}</main>
           </ProtectedRoutes>
         
        </div>
    );
}