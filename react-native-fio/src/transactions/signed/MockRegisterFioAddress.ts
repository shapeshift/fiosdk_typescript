export class MockRegisterFioAddress{

    ENDPOINT:string = "/register_fio_name"; 
    ACTION:string = "regaddress" 
    ACOUNT:string = "fio.system"
    fioAddress:string
    publicKey:string
    server:string

    constructor(fioAddress:string,publicKey:string,server:string){
        this.fioAddress = fioAddress;
        this.publicKey = publicKey
        this.server = server
    }

    async execute():Promise<any>{
        let body = {
            fio_name: this.fioAddress,
            owner_fio_public_key : this.publicKey
        } 
        let options = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
            }
        
        return fetch(this.server + this.ENDPOINT,options).then(response => {
            let statusCode = response.status
            let data = response.json()
            return Promise.all([statusCode,data]);
        })
        .then(([status,data]) => {
                if(status < 200 || status >300){
                    throw new Error(JSON.stringify({errorCode:status,msg:data}))
                }else{
                    return data;
                }
        })
    }
    
}