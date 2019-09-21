import Search from './models/Search';
import {elements} from './views/base';
import * as SearchView from './views/SearchView';
import Receipe  from './models/Receipe';
import * as ReceipeView from './views/ReceipeView';
import List from './models/List';
import * as ListView from './views/ListView';
import Likes from './models/Likes';
import * as LikeView from './views/LikesView';

const state=[];

/**
 * To find the searchresults for typed keyword
 */

const  searchFuntion=async ()=>{
    const query=SearchView.getInputValue();
    if(query && query.trim()){ 
    const searchObj=new Search(query);
    SearchView.spinner(elements.resultMain);
    state.result=await searchObj.getResults();
    if(state.result.length>0){ 
    SearchView.setInputEmptyValue();
    // TO remove empty data message
    ReceipeView.clearReceipe(); 
    SearchView.setNullList();
    SearchView.removeSpinner();
    SearchView.renderReceipeList(state.result);
    }else{
        setForEmptyData();
    }
}    
    };

     function setForEmptyData(){
        SearchView.setNullList();
        SearchView.removeSpinner();
        SearchView.setEmptyData();
        SearchView.clearButtons();
   }

    /**
     * For loading grid list event listener
     */
elements.search.addEventListener('submit',(el)=>{
    // preventDefault() to stops the reloading of page when submit is pressed.
el.preventDefault();
searchFuntion();
});

elements.resultPage.addEventListener('click',el=>{
   const goto=el.target.closest('.btn-inline').dataset.goto;
   SearchView.setNullList();
   SearchView.setInputEmptyValue();
   SearchView.renderReceipeList(state.result,parseInt(goto),10);
});

const callToReceipe = async ()=>{
const id=window.location.hash.replace('#','');
if(id){
ReceipeView.clearReceipe();    
SearchView.spinner(elements.receipTag);
state.receipe=new Receipe(id); 
await state.receipe.fetchReceipe();
if(state.receipe.recipe_id){
state.receipe.calcTime();
state.receipe.calcServings();
state.receipe.parseIng();
SearchView.removeSpinner();
ReceipeView.renderReceipe(state.receipe,state.likes.isLiked(id));
if(state.result)
SearchView.highlightSelected(id);
}else{
   setForEmptyData();
}
}
}


['hashchange','load'].forEach(el=>window.addEventListener(el,callToReceipe));
window.onload=function(){
    state.likes=new Likes(); 
    state.likes.restoreLikes();  
    LikeView.changeLikeMenu(state.likes.likesCount());
    if(state.likes.Likes)
    state.likes.Likes.forEach(item=>LikeView.renderLikesPanel(item));
}


const removeFromCart=(key)=>
{   
    state.list.deleteItem(key);
    ListView.deleteItem(key);
}

elements.receipTag.addEventListener('click',el=>{
    if(el.target.matches('.receipe_dec, .receipe_dec *')){
    if(state.receipe.servings>1){
        state.receipe.updateServingsIng('dec');
        ReceipeView.updateServings(state.receipe);
    }
    }else if(el.target.matches('.receipe_inc, .receipe_inc *')){
    state.receipe.updateServingsIng('inc');
    ReceipeView.updateServings(state.receipe);
    }else if(el.target.matches('.add_to_cart, .add_to_cart *')){       
        addToCart();
    }else if(el.target.matches('.recipe__love, .recipe__love *')){
 if(!state.likes)  state.likes=new Likes();
const receipeKey=state.receipe.recipe_id;
if(state.likes.isLiked(receipeKey)){
    state.likes.removeItem(receipeKey);
LikeView.changeLike(false);
LikeView.removelike(receipeKey);
 }else{
     const item={
        id:  receipeKey,
        title:state.receipe.title,
        author:state.receipe.publisher,
        img:state.receipe.image_url
     }
     LikeView.renderLikesPanel(item) 
    state.likes.addItem(item.id,item.title,item.author,item.img);
    LikeView.changeLike(true);
  
}
 LikeView.changeLikeMenu(state.likes.likesCount());
    } 
})

elements.shoppingList.addEventListener('click',event=>{
    const id= event.target.closest('.shopping__item').dataset.itemid;
     if(event.target.matches('.shopping__delete, .shopping__delete *')){      
      removeFromCart(id);
      }else if(event.target.matches('.shopping__count-value')){
      state.list.updateCount( parseInt(event.target.value,10),id);
      }
})


function addToCart(){
  if(!state.list)
    state.list =new List();
state.receipe.ingredients.forEach(ingredient=>{
 const item=   state.list.addItem(ingredient.count,ingredient.unit,ingredient.ingredient);
  ListView.renderItem(item);  
})  
}



