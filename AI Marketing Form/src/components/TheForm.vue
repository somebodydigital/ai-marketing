<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6 mx-auto">
                <div v-if="!submitted">
                    <form class="w-100" @submit.prevent="onSubmit">
                        <div id="section-1">
                            <div class="mb-3">
                                <label for="companyType" class="form-label">Business Type</label>
                                <select v-model="companyInfo.companyType" class="form-select" aria-label="Select a business type">
                                    <option selected>Select a business type</option>
                                    <option value="B2B">B2B</option>
                                    <option value="B2C">B2C</option>
                                    <option value="Both">Both</option>
                                </select>
                                <button type="button" class="btn btn-primary mt-3 w-100" @click="nextForm">Next</button>
                            </div>
                        </div>
                        <div id="section-2" style="display: none">
                            <div class="mb-3">
                                <label for="campaignType" class="form-label">Campaign Type</label>
                                <select v-model="campaignType" class="form-select" aria-label="Default select example">
                                    <option selected>Select a campaign type</option>
                                    <option value="SEO">SEO</option>
                                    <option value="CRO">CRO</option>
                                    <option value="PPC">PPC</option>
                                </select>
                                <button type="button" class="btn btn-primary mt-3 w-100" @click="nextForm">Next</button>
                            </div>
                        </div>
                        <div id="section-3" style="display: none">
                            <div class="mb-3">
                                <label for="companyName" class="form-label">Company Name</label>
                                <input type="text" v-model="companyInfo.companyName" class="form-control" id="companyName" />
                                <button type="button" class="btn btn-primary mt-3 w-100" @click="nextForm">Next</button>
                            </div>
                        </div>
                        <div id="section-4" style="display: none">
                            <div class="mb-3">
                                <label for="companyFocus" class="form-label">Industry</label>
                                <input type="text" v-model="companyInfo.companyFocus" class="form-control" id="companyFocus" />
                                <button type="button" class="btn btn-primary mt-3 w-100" @click="nextForm">Next</button>
                            </div>
                        </div>
                        <div id="section-5" style="display: none">
                            <div class="mb-3">
                                <label for="companyKeywords" class="form-label">Keywords</label>
                                <input type="text" v-model="companyInfo.companyKeywords" class="form-control" id="companyKeywords" />
                                <button type="button" class="btn btn-primary mt-3 w-100" @click="nextForm">Next</button>
                            </div>
                        </div>
                        <div id="section-6" style="display: none">
                            <div class="mb-3">
                                <!-- render inputted data -->
                                <p class="text-center">
                                    The company {{ companyInfo.companyName }} is a {{ companyInfo.companyFocus }} company that focuses on
                                    {{ companyInfo.companyKeywords }}.
                                </p>
                                <button type="submit" class="btn btn-primary mt-3 w-100" @click="submitForm">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <h4 class="text-center">Thank you for your submission!</h4>
                    <div>
                        <p class="text-center">Your response is pending...</p>
                    </div>
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
                companyType: "Select a business type",
            },
            submitted: false,
            pending: true,
            returnedData: {
                step1: "",
            },
            campaignType: "Select a campaign type",
        };
    },
    methods: {
        async submitForm() {
            set(ref(db, this.companyInfo.companyName), {
                companyFocus: this.companyInfo.companyFocus,
                companyKeywords: this.companyInfo.companyKeywords,
                companyName: this.companyInfo.companyName,
                campaignType: this.campaignType,
                returnedData: this.returnedData,
                responsePending: this.pending,
            });
            this.submitted = true;

            // fetch data from server -> bot's response
            const response = await fetch("https://openai-ai-marketing.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: `Write an SEO, CRO and PPC strategy for ${this.companyInfo.companyName} - they are in the ${this.companyInfo.companyFocus} industry and focus on ${this.companyInfo.companyKeywords}`,
                }),
            });

            // if response pending, console log ...
            if (response.status === 202) {
                console.log("Response pending...");
            }

            if (response.ok) {
                // update db
                const data = await response.json(),
                    parsedData = data.bot.trim();

                console.log(parsedData);

                this.returnedData.step1 = parsedData;
                this.pending = false;
            } else {
                const err = await response.text();

                alert(err);
            }
        },
        nextForm() {
            // once the user clicks next, the form will scroll to the next section
            const form = document.querySelector("form"),
                formSections = form.querySelectorAll("div[id^='section-']"),
                currentSection = form.querySelector("div[id^='section-']:not([style*='display: none'])"),
                currentSectionIndex = Array.from(formSections).indexOf(currentSection);

            formSections[currentSectionIndex].style.display = "none";

            if (currentSectionIndex + 1 < formSections.length) {
                formSections[currentSectionIndex + 1].style.display = "block";
            }

            // scroll to the top of the form
            form.scrollIntoView();
        },
    },
};
</script>
