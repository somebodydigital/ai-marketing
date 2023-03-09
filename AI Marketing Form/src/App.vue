<script setup>
import TheForm from "./components/TheForm.vue";
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
