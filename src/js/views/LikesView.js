import {elements} from './base';
import {limiter} from './SearchView';


export const changeLike=(key)=>{
    const attr= key==true? "icon-heart":"icon-heart-outlined" ;
document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${attr}`);
}


export const changeLikeMenu=count=>{
elements.likeMenu.style.visibility= count>0 ? "visible":"hidden";
}

export const clearLikesPanel=()=>{
    elements.likesList.innerHTML="";
}

export const removelike=val=>{
const element=document.querySelector(`a[href="#${val}"]`).parentElement;
element.parentElement.removeChild(element);
}

export const renderLikesPanel=(item)=>{
const markup=`
<li>
<a class="likes__link" href="#${item.id}">
    <figure class="likes__fig">
        <img src="${item.img}" alt="Test">
    </figure>
    <div class="likes__data">
        <h4 class="likes__name">${ limiter(item.title)}</h4>
        <p class="likes__author">${item.author}</p>
    </div>
</a>
</li>
`;
elements.likesList.insertAdjacentHTML('beforeend',markup);

}