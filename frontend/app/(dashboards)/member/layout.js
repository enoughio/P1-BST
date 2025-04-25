import MemberLayout from "@/components/member-layout";
import ProtectedRoutes from "@/components/protected-routes";

export default function Layout({ children }) {
    return (
        <div>
            {/* Add any layout-specific elements here */}
            <ProtectedRoutes allowedRoles={['member']} >
                <MemberLayout>
                    <main>{children}</main>
                </MemberLayout>
            </ProtectedRoutes>

        </div>
    );
}