<template>
    <div class="dashboard container">
        <div class="row">
            <div class="col-lg-6 col-12">
                <button class="dashboard-button">
                    <router-link to="/onboarding" class="dashboard-link">Onboarding</router-link>
                </button>
            </div>
            <div class="col-lg-6 col-12">
                <button class="dashboard-button">
                    <router-link to="/database" class="dashboard-link">Database</router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    margin-top: 100px;
}
.dashboard-button {
    width: 100%;
    height: 200px;
    background: #333;
    border: #ccc 1px solid;
    border-radius: 10px;
}
.dashboard-button a {
    color: #fff;
}
.dashboard-button a:hover {
    background: transparent;
}
</style>
