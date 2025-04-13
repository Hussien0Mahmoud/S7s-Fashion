function updateNavbar() {
    let login = document.querySelector("#login");
    let signUp = document.querySelector("#signUp");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let menu = document.querySelector(".menu");

    if (currentUser) {
        // Create welcome message
        login.innerHTML = `
            <div class="user-welcome">
                <i class="fas fa-user"></i>
                <span>Welcome, ${currentUser.username}</span>
            </div>`;

        // Create sign out button
        signUp.innerHTML = `<a href="#" class="sign-out">Sign Out</a>`;
        
        // Add role-specific navigation links
        if (currentUser.userrole === "admin") {
            // Add admin dashboard link before login item
            const adminLink = document.createElement("li");
            adminLink.innerHTML = `<a href="/Admin/admin.html">Admin Dashboard</a>`;
            menu.insertBefore(adminLink, login);
        } else if (currentUser.userrole === "seller") {
            // Add seller dashboard link before login item
            const sellerLink = document.createElement("li");
            sellerLink.innerHTML = `<a href="/seller/seller.html">Seller Dashboard</a>`;
            menu.insertBefore(sellerLink, login);
        }

        // Add sign out functionality
        const signOutBtn = signUp.querySelector('.sign-out');
        signOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "/index.html";
        });

    } else {
        // Default state for non-logged in users
        login.innerHTML = `<a href="/html/login.html">Login</a>`;
        signUp.innerHTML = `<a href="/html/signUp.html">Sign Up</a>`;
        
        // Remove any role-specific links if they exist
        const adminLink = menu.querySelector('a[href="/Admin/admin.html"]');
        const sellerLink = menu.querySelector('a[href="/seller/seller.html"]');
        
        if (adminLink) {
            adminLink.parentElement.remove();
        }
        if (sellerLink) {
            sellerLink.parentElement.remove();
        }
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', updateNavbar);