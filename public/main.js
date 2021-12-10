const socket = io();
const messages = document.querySelector('.messages');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const nameBlock = document.querySelector('.name');

//Tillåt inte tom inmatning
let userName;
do{
    userName = prompt('Din namn:');
}
while(!userName);


nameBlock.innerHTML = `${userName}`;

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(input.value){
        socket.emit('chat message', 
        {
            message:input.value,
            name:userName
        });
        input.value = '';
    };
});

socket.on('chat message', (data)=>{
    const item = document.createElement('li');
    item.innerHTML = `<span>${data.name} `+ 'säger '+`</span>: ${data.message}`
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
})