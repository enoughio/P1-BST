#!/bin/bash

# BST Backend RBAC Security Verification Script

echo "🔒 Verifying RBAC Implementation..."

# Check for proper middleware imports
echo ""
echo "📋 Checking middleware imports..."

route_files=(
    "src/routes/auth.js"
    "src/routes/users.js"
    "src/routes/clubs.js"
    "src/routes/members.js"
    "src/routes/events.js"
    "src/routes/meetings.js"
    "src/routes/projects.js"
    "src/routes/awards.js"
    "src/routes/initiatives.js"
    "src/routes/memberships.js"
    "src/routes/payments.js"
    "src/routes/executive-committee.js"
    "src/routes/razorpay.js"
)

missing_rbac=()

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "roleAuth\|ownerOrAdminAuth\|clubMemberAuth\|USER_ROLES" "$file"; then
            echo "✅ $file - RBAC middleware imported"
        else
            echo "⚠️  $file - Missing enhanced RBAC imports"
            missing_rbac+=("$file")
        fi
    else
        echo "❌ $file - File not found"
    fi
done

# Check for unprotected routes
echo ""
echo "🛡️  Checking for potentially unprotected routes..."

unprotected_routes=()

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        # Look for router methods without auth middleware
        if grep -n "router\.\(get\|post\|put\|delete\)" "$file" | grep -v "auth\|Public" | grep -v "webhook"; then
            echo "⚠️  Potential unprotected routes in $file:"
            grep -n "router\.\(get\|post\|put\|delete\)" "$file" | grep -v "auth\|Public" | grep -v "webhook" | head -3
            unprotected_routes+=("$file")
        fi
    fi
done

# Check for admin-only operations
echo ""
echo "👑 Checking admin protection on management operations..."

admin_operations=("POST.*clubs" "PUT.*clubs" "DELETE.*clubs" "POST.*events" "PUT.*events" "DELETE.*events" "DELETE.*users")

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        for operation in "${admin_operations[@]}"; do
            if grep -q "$operation" "$file"; then
                if grep -A5 -B5 "$operation" "$file" | grep -q "adminAuth\|superAdminAuth\|roleAuth"; then
                    echo "✅ $file - $operation properly protected"
                else
                    echo "❌ $file - $operation may not be properly protected"
                fi
            fi
        done
    fi
done

# Check for SuperAdmin-only operations
echo ""
echo "🔑 Checking SuperAdmin protection on sensitive operations..."

superadmin_operations=("admins/create" "DELETE.*users" "transfer.*role")

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        for operation in "${superadmin_operations[@]}"; do
            if grep -q "$operation" "$file"; then
                if grep -A5 -B5 "$operation" "$file" | grep -q "superAdminAuth"; then
                    echo "✅ $file - $operation properly protected with SuperAdmin"
                else
                    echo "❌ $file - $operation should be SuperAdmin only"
                fi
            fi
        done
    fi
done

# Check for resource ownership protection
echo ""
echo "👤 Checking resource ownership protection..."

ownership_patterns=("users/:id" "members/:username" "payments/user")

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        for pattern in "${ownership_patterns[@]}"; do
            if grep -q "$pattern" "$file"; then
                if grep -A5 -B5 "$pattern" "$file" | grep -q "ownerOrAdminAuth"; then
                    echo "✅ $file - $pattern has ownership protection"
                else
                    echo "⚠️  $file - $pattern may need ownership protection"
                fi
            fi
        done
    fi
done

# Summary
echo ""
echo "📊 RBAC Verification Summary:"
echo "=============================="

if [ ${#missing_rbac[@]} -eq 0 ]; then
    echo "✅ All route files have RBAC middleware imports"
else
    echo "⚠️  Files missing enhanced RBAC: ${#missing_rbac[@]}"
    for file in "${missing_rbac[@]}"; do
        echo "   - $file"
    done
fi

if [ ${#unprotected_routes[@]} -eq 0 ]; then
    echo "✅ No obviously unprotected routes found"
else
    echo "⚠️  Files with potentially unprotected routes: ${#unprotected_routes[@]}"
    for file in "${unprotected_routes[@]}"; do
        echo "   - $file"
    done
fi

echo ""
echo "🔒 Security Recommendations:"
echo "1. Review any unprotected routes and add appropriate middleware"
echo "2. Ensure all management operations require admin privileges"
echo "3. Verify SuperAdmin protection on sensitive operations"
echo "4. Test with different user roles to confirm access control"
echo "5. Check resource ownership validation for personal data"

echo ""
echo "📚 Documentation:"
echo "- See RBAC.md for complete role-based access control documentation"
echo "- See README.md for API endpoint protection details"
echo "- Test with provided seed users (admin@bst.org, john@example.com)"
