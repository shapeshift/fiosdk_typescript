import { AbiResponse } from '../entities/AbiResponse';
import { RawTransaction } from '../entities/RawTransaction';
type FetchJson = (uri: string, opts?: Object) => Object

export class Transactions {
    static baseUrl:string;
    static publicKey:string;
    static privateKey:string;
    static abiMap: Map<string, AbiResponse> = new Map<string, AbiResponse>();
    static io:{fetch(param:any,param2:any):Promise<any>}
    static FioProvider:{
        prepareTransaction(param:any):Promise<any>;
        accountHash(pubkey : string) : string
    };

    static fetchJson:FetchJson
    serilizeEndpoint:string = "chain/serialize_json";

    getActor():string{
       const actor = Transactions.FioProvider.accountHash(Transactions.publicKey)
        return actor
    }
    
    serializeJson(data:any,action:string):Promise<any>{
        let body = {
            "action":action,
            "json":data
        }
        let fetchOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        }
        return this.executeCall(this.serilizeEndpoint,<any>null,fetchOptions)
    }

    async getChainInfo():Promise<any>{
        let options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        }   
        /*
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
        */
        const res = await Transactions.fetchJson(Transactions.baseUrl + 'chain/get_info', options);
        return res
    }
  
    async getBlock(chain:any):Promise<any>{   
        if( chain == undefined){
            throw new Error("chain undefined")
        } 
        if( chain.last_irreversible_block_num == undefined){
            throw new Error("chain.last_irreversible_block_num undefined")
        } 
      const res = await Transactions.fetchJson(Transactions.baseUrl + 'chain/get_block', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                block_num_or_id: chain.last_irreversible_block_num
            })
        });
        return  res
  }

    async pushToServer(transaction:RawTransaction,endpoint:string):Promise<any>{
        console.error("pushToServerX")
        console.error("Transactions.privateKey::" + Transactions.privateKey)
        const privky:Array<string> = new Array<string>()
        privky.push(Transactions.privateKey)
        let chain = await this.getChainInfo().catch((error) => console.error("chain:: " + error))
        let block = await this.getBlock(chain).catch((error) => console.error("block"));
        transaction.ref_block_num = block.block_num
        transaction.ref_block_prefix = block.ref_block_prefix
        let expiration = new Date(block.timestamp  + "Z")
        expiration.setSeconds(expiration.getSeconds() + 120)
        let expirationStr = expiration.toISOString()
        transaction.expiration = expirationStr.substr(0, expirationStr.length - 1);
        console.error("Transactions.prepareTransaction::ANTES")
        console.error("transaction:: " + JSON.stringify(transaction))
        const signedTransaction = await Transactions.FioProvider.prepareTransaction({
            transaction, chainId: chain.chain_id, privateKeys: privky, abiMap: Transactions.abiMap,
            textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
            console.error("Transactions.prepareTransaction::OK")

        /*let sigArray = new Array();
        sigArray.push(signedTransaction.signature);
        let data = {
            signatures:sigArray,
            packed_trx:signedTransaction.hex,
            compression:"none",
            packed_context_free_data:""
        }*/
        console.error('signedTransaction:: ' + JSON.stringify(signedTransaction))
        return this.executeCall(endpoint,JSON.stringify(signedTransaction))
    }

    executeCall(endPoint:string,body:string,fetchOptions?:any):any{
        console.error("Transactions.executeCall::"+endPoint)
        let options:any;
        if(fetchOptions != null){
            options = fetchOptions;
            if(body!=null){
                options.body = body
            }
        }else{
            options = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body:body
            }
        } // Transactions.fetchJson
        /*return Transactions.io.fetch(Transactions.baseUrl + endPoint,options).then(response => {
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
        })*/
        console.error('Transactions.baseUrlX:: ' + Transactions.baseUrl)
        const res =  Transactions.fetchJson(Transactions.baseUrl + endPoint,options)
        return res
    }

}