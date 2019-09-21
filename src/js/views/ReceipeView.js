import {elements} from './base';

const receipeRened=ing=>{
    return `
    <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${ing.count}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ing.unit}</span>
       ${ing.ingredient}
    </div>
</li>

    `;
}

export const clearReceipe=()=>{
    elements.receipTag.innerHTML='';
} 



export const renderReceipe=(receipe,isliked)=>{
const markup=`
<figure class="recipe__fig">
                <img src=${receipe.image_url} alt="${receipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${receipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${receipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${receipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny receipe_dec">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny receipe_inc">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${isliked==true ? "icon-heart":"icon-heart-outlined"}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
${receipe.ingredients.map(el=>receipeRened(el)).join('')}
                </ul>

                <button class="btn-small recipe__btn add_to_cart" >
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

           

`;
elements.receipTag.insertAdjacentHTML('afterbegin',markup);
}


export const updateServings=receipe=>{

document.querySelector('.recipe__info-data--people').textContent=receipe.servings;

Array.from(document.querySelectorAll('.recipe__count')).forEach((value,index)=>{
value.textContent=receipe.ingredients[index].count.toFixed(2);
})

}