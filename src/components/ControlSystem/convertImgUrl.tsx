export default function convertImgUrl(url: string): string {
    
    let imgUrl = url
    let formatUrl = ""
    for(let i=32;i<65;i++){
        formatUrl += imgUrl[i];
    }
      return `https://drive.google.com/uc?export=view&id=${formatUrl}`;
  }
  