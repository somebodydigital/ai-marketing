<template>
    <div class="container">
        <div class="row border p-2 mb-4" v-for="client in clients" :key="client.companyID">
            <div class="col align-self-center">
                <h3 class="mb-0">{{ client.companyName }}</h3>
            </div>
            <div class="col-2 align-self-center">
                <p class="mb-0">{{ client.companyFocus }}</p>
            </div>
            <div class="col-1 align-self-center">
                <!-- yellow dot -->
                <div v-if="client.responsePending" class="pending-dot mx-auto"></div>
                <!-- green dot -->
                <div v-else class="approved-dot mx-auto"></div>
            </div>
            <div class="col align-self-center d-flex justify-content-end">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#' + client.companyID + '-modal'">Details</button>
            </div>
            <div class="modal fade" :id="client.companyID + '-modal'" tabindex="-1" :aria-labelledby="client.companyID + '-modal-label'" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" :id="client.companyID + '-modal-label'">{{ client.companyName }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-section">
                                <h5>Industry Focus</h5>
                                <p>
                                    {{ client.companyFocus }}
                                </p>
                            </div>
                            <div class="modal-section">
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Keyword</th>
                                            <th scope="col">Search Volume</th>
                                            <th scope="col">Difficulty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="keyword in client.companyKeywords" :key="keyword.name">
                                            <td>
                                                {{ keyword.name }}
                                            </td>
                                            <td>
                                                {{ keyword.volume }}
                                            </td>
                                            <td>
                                                {{ keyword.difficulty }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-section">
                                <div v-if="client.responsePending">
                                    <h5>Response Pending</h5>
                                    <p>We are currently waiting for a response.</p>
                                </div>
                                <div v-else>
                                    <h5>Response</h5>
                                    <p>
                                        {{ client.response }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
.modal-content {
    background: #2c2c2c;
}
.modal-section:nth-of-type(n + 2) {
    margin: 50px 0;
}
</style>
