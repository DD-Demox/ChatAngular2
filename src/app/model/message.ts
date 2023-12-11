export class Message {
    id:number;
    to:string | undefined;
    from:string| undefined;
    message:string | undefined;
    img:string | undefined;
    imgFrom:string;

    constructor(to,from,message,img,imgFrom){ 
        this.to=to;
        this.from=from;
        this.message=message;
        this.img = img;
        this.imgFrom = imgFrom;
    }
}
