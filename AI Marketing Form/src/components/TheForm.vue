<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6 mx-auto">
                <div v-if="!submitted">
                    <form class="w-100" @submit.prevent="onSubmit">
                        <div class="mb-3">
                            <label for="companyName" class="form-label">Company Name</label>
                            <input type="text" v-model="companyInfo.companyName" class="form-control" id="companyName" />
                        </div>
                        <div class="mb-3">
                            <label for="companyFocus" class="form-label">Industry</label>
                            <input type="text" v-model="companyInfo.companyFocus" class="form-control" id="companyFocus" />
                        </div>
                        <div class="mb-3">
                            <label for="companyKeywords" class="form-label">Keywords</label>
                            <input type="text" v-model="companyInfo.companyKeywords" class="form-control" id="companyKeywords" />
                        </div>
                        <button type="submit" class="btn btn-primary mt-3 w-100" @click="submitForm">Submit</button>
                    </form>
                </div>
                <div v-else>
                    <h4 class="text-center">Thank you for your submission!</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, set, ref } from "../firebase";

export default {
    name: "TheForm",
    data() {
        return {
            companyInfo: {
                companyName: "",
                companyFocus: "",
                companyKeywords: "",
                companyKeywordsArr: [],
            },
            submitted: false,
        };
    },
    methods: {
        submitForm() {
            set(ref(db, this.companyInfo.companyName), {
                companyFocus: this.companyInfo.companyFocus,
                companyKeywords: this.companyInfo.companyKeywords,
                companyName: this.companyInfo.companyName,
            });
            this.submitted = true;
        },
        // push keywords into array, split by comma
        splitKeywords() {},
    },
    // watch for changes in companyInfo.companyKeywords and split them
    watch: {
        "companyInfo.companyKeywords": function () {
            this.splitKeywords();
        },
    },
};
</script>
