import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const passwordProtect = () => {
    const password = prompt("Enter password to access");

    if (password !== "tryGpA2BWR4gXKrcMcGs") {
        alert("Wrong password");
        passwordProtect();
    } else {
        alert("Correct password");
    }
};

passwordProtect();

const form = document.querySelector("form"),
    chatContainer = document.querySelector("#chat_container");

let loadInterval;

const loader = (element) => {
    element.textContent = "";

    loadInterval = setInterval(() => {
        element.textContent += ".";

        if (element.textContent === "...") {
            element.textContent = "";
        }
    }, 300);
};

const typeText = (element, text) => {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
};

const generateUniqueId = () => {
    const timeStamp = Date.now(),
        randomNumber = Math.random(),
        hexadecimalString = randomNumber.toString(16);

    return `id-${timeStamp}-${hexadecimalString}`;
};

const chatStripe = (isAI, value, uniqueID) => {
    return `
            <div class="wrapper ${isAI && "ai"}">
                <div class="chat">
                    <div class="profile">
                        <img 
                            src="${isAI ? bot : user}"
                            alt="${isAI ? "bot" : "user"}"
                        />
                    </div>
                    <div class="message" id="${uniqueID}">${value}</div>
                </div>
            </div>
        `;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
    form.reset();

    // bot's chatstripe
    const uniqueID = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueID);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueID);

    loader(messageDiv);

    // fetch data from server -> bot's response
    const response = await fetch("https://openai-ai-marketing.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: `${data.get("prompt")}`,
        }),
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = "";

    if (response.ok) {
        const data = await response.json(),
            parsedData = data.bot.trim();

        typeText(messageDiv, parsedData);
    } else {
        const err = await response.text();

        messageDiv.innerHTML = "Something went wrong";

        alert(err);
    }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
});
