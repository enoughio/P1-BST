import AdminLayout from "@/components/admin-layout";
import ProtectedRoutes from "@/components/protected-routes";

export default function Layout({ children }) {
    return (
        <div>
            {/* Add any layout-specific elements here */}
            <ProtectedRoutes allowedRoles={['superadmin']} >
                <AdminLayout>
                    <main>{children}</main>
                </AdminLayout>
            </ProtectedRoutes>

        </div>
    );
}