const btn = document.getElementById('btn')
const liffId = '2000422188-l3GpOXkj'
let userId = ''

function main(){
    liff.init({liffId:liffId})
    liff.ready.then(()=>{
        console.log(liff.isLoggedIn())
        if(!liff.isLoggedIn()){
            liff.login()
        }
        liff.getProfile().then(profile =>{
            console.log(profile)
        })
    })
}

main()

async function send(e){
    e.preventDefault();
    const stunumber = document.getElementsByName("StudentNumber");
    const Class = document.getElementsByName("Class");
    const room = document.getElementsByName("Room");
    const number = document.getElementsByName("Number");
    try {
        const result = await axios.post("localhost:3000/api/v1/link-richmenu", {
            studentnumber: stunumber,
            class:Class,
            room:room,
            number:number,
            userId:userId
        })
        if(result.status == 200){
            console.log("done")
        }
    } catch (error) {
        console.log(error)
    }
    
}