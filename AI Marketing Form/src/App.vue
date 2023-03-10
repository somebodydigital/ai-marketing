<script setup>
import TheForm from "./components/TheForm.vue";

// create simple authentication
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
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.png" />
    </header>

    <main>
        <TheForm />
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

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
