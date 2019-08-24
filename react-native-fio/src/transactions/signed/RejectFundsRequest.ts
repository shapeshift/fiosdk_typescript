import { SignedTransaction } from './SignedTransaction';

export class RejectFundsRequest extends SignedTransaction{

    ENDPOINT:string = "chain/reject_funds_request"; 
    ACTION:string = "rejectfndreq" 
    ACOUNT:string = "fio.reqobt"
    fioreqid:string
    maxFee:number
    tpid:string

    constructor(fioreqid:string,maxFee:number,tpid:string=""){
        super();
        this.fioreqid = fioreqid;
        this.maxFee = maxFee;
        this.tpid = tpid;
    }

    getData():any{
        let actor = this.getActor();
        let data = {
            fio_request_id:this.fioreqid,
            max_fee: this.maxFee,
            tpid: this.tpid,
            actor: actor
        }
        return data;
    }
    
}