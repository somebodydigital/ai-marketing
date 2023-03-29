<template>
    <div class="onboarding container">
        <TheForm />
    </div>
</template>

<script>
import TheForm from "../components/TheForm.vue";

export default {
    name: "Onboarding",
    components: {
        TheForm,
    },
};
</script>

<style scoped>
.onboarding {
    margin-top: 100px;
}
</style>
