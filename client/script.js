import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

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

// select form and chat container
const form = document.querySelector("form"),
    chatContainer = document.querySelector("#chat_container");

// create loader ("...")
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

// type text one character at a time
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

// generate unique ID for each message
const generateUniqueId = () => {
    const timeStamp = Date.now(),
        randomNumber = Math.random(),
        hexadecimalString = randomNumber.toString(16);

    return `id-${timeStamp}-${hexadecimalString}`;
};

// create chat stripe (message)
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

// handle submit including enter key
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
