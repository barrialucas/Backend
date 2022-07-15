const socket=io.connect();

//productos

//mensajes
const render=(data)=>{
    const html=data.map((e)=>{
        return(`
        <div>
        <strong style="color:blue">${e.mail}</strong>
        <text style="color:brown">[${e.fecha}]:</text>
        <em style="color:green">${e.text}</em>
        </div>
        `)
    }).join(` `);
    document.getElementById(`chat`).innerHTML=html
}

socket.on(`message`,(data)=>{
    render(data)
})

const add=()=>{
    let fecha=new Date().toLocaleDateString()
    let hora= new Date().toLocaleTimeString()
    const message={
        mail:document.getElementById(`mail`).value,
        text:document.getElementById(`text`).value,
        fecha:fecha+" "+hora,
    };
    socket.emit(`new-msg`, message);
    return false;
}


const form=document.getElementById(`form`)
form.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    console.log("ASd")
    add();
    
})