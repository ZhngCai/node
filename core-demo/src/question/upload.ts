import QTip from "./tip";

class QUpload {
    data!:CFUploadQuestion;
    prev:string='';
    init(data:CFUploadQuestion){
        this.data = data;
        if(data.prev){
            this.prev = QTip.pre+','
        }
    }
    getMessage():string{
        let message = `${this.data.title}\n`;
            message += `${this.data.options[0].text}\n`;
            message += `${QTip.quit},${this.prev}${QTip.next}\n`;
        return message;
    }
}


const qUpload = new QUpload();
export default qUpload;