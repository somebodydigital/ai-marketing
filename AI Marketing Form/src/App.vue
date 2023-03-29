<script>
import TheForm from "./components/TheForm.vue";
import TheDashboard from "./components/TheDatabase.vue";

export default {
    name: "App",
    components: {
        TheForm,
        TheDashboard,
    },
    setup() {
        // create simple page authentication
        const passwordProtect = () => {
            const password = prompt("Enter password to access");

            // set cookie
            document.cookie = `password=${password}`;

            // if cookie is set, skip password
            if (document.cookie === "password=tryGpA2BWR4gXKrcMcGs") {
                return;
            }

            if (password !== "tryGpA2BWR4gXKrcMcGs") {
                alert("Wrong password");
                passwordProtect();
            } else {
                alert("Correct password");
            }
        };
        // only run if no password cookie is set
        if (!document.cookie) passwordProtect();
    },
};
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg w-100">
            <img alt="Vue logo" class="logo" src="./assets/logo.png" />
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/onboarding" class="nav-link">Onboarding</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/database" class="nav-link">Database</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style scoped>
header {
    line-height: 1.5;
    padding: 0;
}

.logo {
    display: block;
    margin: 0 auto;
}
.nav-link {
    color: #fff;
}
.nav-link:hover {
    background: transparent;
    color: #ccc;
}
</style>
