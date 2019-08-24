import { SignedTransaction } from './SignedTransaction';
export class RegisterFioDomain extends SignedTransaction{

    ENDPOINT:string = "chain/register_fio_domain"; 
    ACTION:string = "regdomain" 
    ACOUNT:string = "fio.system"
    fioDomain:string
    maxFee:number
    tpid:string

    constructor(fioDomain:string, maxFee:number,tpid:string=""){
        super();
        this.fioDomain = fioDomain;
        this.maxFee = maxFee;
        this.tpid = tpid;
    }

    getData():any{
        let actor = this.getActor();
        let data = {
            fio_domain:this.fioDomain,
            owner_fio_public_key:this.publicKey,
            max_fee: this.maxFee,
            tpid: this.tpid,
            actor: actor
        }
        return data;
    }
    
}