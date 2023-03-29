<template>
    <div class="database container">
        <TheDatabase />
    </div>
</template>

<script>
import TheDatabase from "../components/TheDatabase.vue";

export default {
    name: "Database",
    components: {
        TheDatabase,
    },
};
</script>

<style scoped>
.database {
    margin-top: 100px;
}
</style>
