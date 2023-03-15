<template>
    <div class="container">
        <div class="row border p-2" v-for="client in clients">
            <div class="col align-self-center">
                <h3 class="mb-0">{{ client.companyName }}</h3>
            </div>
            <div class="col align-self-center">
                <p class="mb-0">{{ client.companyFocus }}</p>
            </div>
            <div class="col align-self-center">
                <!-- yellow dot -->
                <div v-if="client.responsePending" class="pending-dot mx-auto"></div>
                <!-- green dot -->
                <div v-else class="approved-dot mx-auto"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pending-dot {
    width: 20px;
    height: 20px;
    background-color: #f9c74f;
    border-radius: 50%;
    display: block;
    animation: pulse 2s infinite;
}
.approved-dot {
    width: 20px;
    height: 20px;
    background-color: #90be6d;
    border-radius: 50%;
    display: block;
}
/* pulse pending dot */
@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}
</style>

<script>
import { db, ref, onValue } from "../firebase";

export default {
    name: "TheDashboard",
    data() {
        return {
            clients: [],
        };
    },
    methods: {
        async getCompanyData() {
            const snapshot = await onValue(ref(db), (snapshot) => {
                const data = snapshot.val();
                this.clients = Object.values(data);
            });
        },
    },
    mounted() {
        this.getCompanyData();
    },
};
</script>
