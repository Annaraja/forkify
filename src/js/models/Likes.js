export default class Likes{
    
constructor(){
    this.Likes=[];
}
addItem(id,title,author,img){
const item={
id,
title,
author,
img
}
this.Likes.push(item);
this.persistLikes();
}

removeItem(id){
    const index=this.Likes.findIndex(el=>el.id==id);
    this.Likes.splice(index,1);
    this.persistLikes();
}

isLiked(key){
return this.Likes.findIndex(el=>el.id==key) !==-1;
}

likesCount(){
    return this.Likes.length;
}

persistLikes(){
    localStorage.setItem("likes",JSON.stringify(this.Likes));
}

restoreLikes(){
    if(localStorage.getItem("likes"))
    this.Likes=JSON.parse(localStorage.getItem("likes"));
}
}
