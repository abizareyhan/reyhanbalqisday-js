let messagesHistory = [];

function addButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('bg-rose-500', 'hover:bg-rose-700', 'text-white', 'font-bold', 'py-3', 'px-4', 'rounded-xl', 'fixed', 'bottom-5', 'right-5');

    document.body.appendChild(button);

    return button;
}

function addChatBox() {
    const chatBoxContainer = document.createElement('div');
    chatBoxContainer.classList.add('fixed', 'bottom-0', 'right-0', 'w-full', 'h-full', 'xl:w-1/4', 'xl:h-5/6', 'xl:bottom-5', 'xl:right-5', 'flex', 'flex-col', 'border', 'shadow-md', 'bg-rose-100', 'hidden');

    const userInfo = document.createElement('div');
    userInfo.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'p-2', 'bg-rose-300');

    const userProfile = document.createElement('div');
    userProfile.classList.add('flex', 'items-center');

    const userName = document.createElement('div');
    userName.classList.add('pl-2', 'font-semibold');

    const userNameLink = document.createElement('a');
    userNameLink.href = '#';
    userNameLink.textContent = 'Tanya Asisten';

    userName.append(userNameLink);
    userProfile.append(userName);
    userInfo.append(userProfile);

    const chatBoxAction = document.createElement('div');
    const chatBoxActionButton = document.createElement('button');
    chatBoxActionButton.id = 'close-button';
    chatBoxActionButton.classList.add('inline-flex', 'hover:bg-rose-50', 'rounded-full', 'p-2');
    chatBoxActionButton.type = 'button';
    chatBoxActionButton.innerHTML = '&#x2715'

    chatBoxActionButton.addEventListener('click', () => {
        document.body.classList.toggle('overflow-hidden');
        document.body.classList.toggle('xl:overflow-scroll');
        chatBoxContainer.classList.toggle('hidden');
    });

    chatBoxAction.append(chatBoxActionButton);
    userInfo.append(chatBoxAction);
    chatBoxContainer.append(userInfo);

    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'messages-container';
    messagesContainer.classList.add('flex-1', 'px-4', 'py-4', 'overflow-y-auto');

    const initialAssistantMessage = generateAssitantChatElement('Halo! Saya adalah asisten AI dari pernikahan Reyhan dan Balqis. Apakah kamu butuh bantuan untuk menemukan lokasi, jam acara, atau informasi terkait lainnya Saya siap membantu.');
    messagesContainer.append(initialAssistantMessage);

    chatBoxContainer.append(messagesContainer);

    const chatFooterContainer = document.createElement('div');
    chatFooterContainer.classList.add('flex', 'items-center', 'border-t', 'p-2');

    const chatInputContainer = document.createElement('div');
    chatInputContainer.classList.add('w-full', 'mx-2');

    const chatInputChat = document.createElement('input');
    chatInputChat.id = 'chat-input'
    chatInputChat.classList.add('w-full', 'rounded-full', 'border', 'border-rose-200', 'focus:outline-none', 'focus:border-rose-500', 'py-3', 'px-4');
    chatInputChat.type = 'text';
    chatInputChat.autocomplete = 'off';
    chatInputChat.placeholder = 'Tanya disini';

    chatInputContainer.append(chatInputChat);

    const chatSendContainer = document.createElement('div');
    const chatButtonSend = document.createElement('button');
    chatButtonSend.classList.add('inline-flex', 'bg-rose-500', 'text-white', 'rounded-full', 'px-5', 'py-2');
    chatButtonSend.innerHTML = 'Kirim';

    chatSendContainer.append(chatButtonSend);

    chatFooterContainer.append(chatInputContainer);
    chatFooterContainer.append(chatSendContainer);

    chatBoxContainer.append(chatFooterContainer);

    document.body.append(chatBoxContainer);

    chatButtonSend.addEventListener('click', () => {
        const chatText = document.getElementById('chat-input').value;
        document.getElementById('chat-input').value = null

        getBotResponse(chatText);
    });

    chatInputChat.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const chatText = document.getElementById('chat-input').value;
            document.getElementById('chat-input').value = null

            getBotResponse(chatText);
        }
    });

    return chatBoxContainer;
}

function generateAssitantChatElement(text) {
    const messageItemContainer = document.createElement('div');
    messageItemContainer.classList.add('flex', 'items-center', 'mb-4');

    const messageItemProfile = document.createElement('div');
    messageItemProfile.classList.add('flex-none', 'flex', 'flex-col', 'items-center', 'space-y-1', 'mr-4');

    const messageItemImage = document.createElement('img');
    messageItemImage.classList.add('rounded-full', 'w-10', 'h-10');
    messageItemImage.src = 'https://uploads-ssl.webflow.com/6405b02daecfdb3a2a6ff24c/6435b45ff39892b0908d55da_07d6f0e2-0e93-4ffe-a42e-af7f39f60a43.jpeg';

    messageItemProfile.append(messageItemImage);
    messageItemContainer.append(messageItemProfile);

    const messageItemTextFlex = document.createElement('div');
    messageItemTextFlex.classList.add('flex-initial', 'bg-rose-400', 'text-white', 'p-2', 'rounded-lg', 'mb-2', 'relative');

    const messageItemText = document.createElement('div');
    messageItemText.innerHTML = text;

    messageItemTextFlex.append(messageItemText);
    messageItemContainer.append(messageItemTextFlex);

    return messageItemContainer;
}

function generateLoadingAssistant() {
    const messageItemContainer = document.createElement('div');
    messageItemContainer.classList.add('flex', 'items-center', 'mb-4');

    const messageItemProfile = document.createElement('div');
    messageItemProfile.classList.add('flex-none', 'flex', 'flex-col', 'items-center', 'space-y-1', 'mr-4');

    const messageItemImage = document.createElement('img');
    messageItemImage.classList.add('rounded-full', 'w-10', 'h-10');
    messageItemImage.src = 'https://uploads-ssl.webflow.com/6405b02daecfdb3a2a6ff24c/6435b45ff39892b0908d55da_07d6f0e2-0e93-4ffe-a42e-af7f39f60a43.jpeg';

    messageItemProfile.appendChild(messageItemImage);
    messageItemContainer.appendChild(messageItemProfile);

    const messageItemTextFlex = document.createElement('div');
    messageItemTextFlex.classList.add('flex-initial', 'bg-rose-400', 'text-white', 'p-4', 'rounded-lg', 'mb-2', 'relative', 'flex', 'justify-center');

    const messageItemTextPulse1 = document.createElement('div');
    messageItemTextPulse1.classList.add('h-2', 'bg-white', 'animate-pulse', 'rounded-full', 'w-2', 'mr-1');

    const messageItemTextPulse2 = document.createElement('div');
    messageItemTextPulse2.classList.add('h-2', 'bg-white', 'animate-pulse', 'rounded-full', 'w-2', 'mr-1');

    const messageItemTextPulse3 = document.createElement('div');
    messageItemTextPulse3.classList.add('h-2', 'bg-white', 'animate-pulse', 'rounded-full', 'w-2');

    messageItemTextFlex.appendChild(messageItemTextPulse1);
    messageItemTextFlex.appendChild(messageItemTextPulse2);
    messageItemTextFlex.appendChild(messageItemTextPulse3);

    messageItemContainer.appendChild(messageItemTextFlex);

    return messageItemContainer;
}


function generateUserChatElement(text) {
    const messageItemContainer = document.createElement('div');
    messageItemContainer.classList.add('flex', 'items-center', 'flex-row-reverse', 'mb-4');

    const messageItemProfile = document.createElement('div');
    messageItemProfile.classList.add('flex-none', 'flex', 'flex-col', 'items-center', 'space-y-1', 'ml-4');

    const messageItemImage = document.createElement('img');
    messageItemImage.classList.add('rounded-full', 'w-10', 'h-10');
    messageItemImage.src = 'https://ui-avatars.com/api/?name=U';

    messageItemProfile.append(messageItemImage);
    messageItemContainer.append(messageItemProfile);

    const messageItemTextFlex = document.createElement('div');
    messageItemTextFlex.classList.add('flex-initial', 'bg-rose-200', 'text-gray-800', 'p-2', 'rounded-lg', 'mb-2', 'relative', 'text-right');

    const messageItemText = document.createElement('div');
    messageItemText.innerHTML = text;

    messageItemTextFlex.append(messageItemText);
    messageItemContainer.append(messageItemTextFlex);

    return messageItemContainer;
}

async function getBotResponse(inputChat) {
    gtag('event', 'chat_to_assistant', {
        'inputChat': inputChat,
        'messagesHistory': messagesHistory
    });

    const userMessage = generateUserChatElement(inputChat);
    document.getElementById('messages-container').append(userMessage);

    const loading = generateLoadingAssistant();
    loading.id = 'loading-chat';

    document.getElementById('messages-container').append(loading);


    document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;

    const response = await axios({
        method: 'post',
        url: 'https://us-central1-abzr-playground.cloudfunctions.net/weddingAssistant',
        data: {
            'userChat': inputChat,
            'messagesHistory': messagesHistory.slice(-6),
            'clientId': getClientId()
        }
    });

    messagesHistory.push({
        'role': 'user',
        'content': inputChat
    });

    loading.remove();

    console.log(response.data);


    gtag('event', 'response_from_assistant', {
        'inputChat': inputChat,
        'response': response.data.messageResponse,
        'messagesHistory': messagesHistory
    });

    messagesHistory.push({
        'role': 'assistant',
        'content': response.data.messageResponse
    });

    const assistantMessage = generateAssitantChatElement(response.data.messageResponse);
    document.getElementById('messages-container').append(assistantMessage);

    document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
}

function getClientId() {
    var cookieName = '_ga';
    var cookiePattern = /GA\d+\.\d+\.(\d+\.\d+)/;
    var cookieValue = document.cookie.match(cookiePattern);
    if (cookieValue && cookieValue.length > 1) {
        return cookieValue[1];
    } else {
        return null;
    }
}


const button = addButton('Tanya Asisten');
const chatBoxContainer = addChatBox();

button.addEventListener('click', () => {
    document.body.classList.toggle('overflow-hidden');
    document.body.classList.toggle('xl:overflow-scroll');
    chatBoxContainer.classList.toggle('hidden');
});
