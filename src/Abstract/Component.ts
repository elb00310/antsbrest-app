export class Component{
    root:HTMLElement;
    
    constructor(
        public parrent: HTMLElement,
        tegName:keyof HTMLElementTagNameMap,
        arrStyles?: string[]|null,
        content?: string | null,
        arrProp?: string[]|null,
        arrValue?: string[]|null
    ){
        this.root = document.createElement(tegName);
        if (arrStyles) {
            arrStyles.forEach((nameStyle)=>{
                this.root.classList.add(nameStyle);

            });
        }
        if (content) this.root.innerHTML = content;
        if (arrProp && arrValue && arrProp.length === arrValue.length){
            arrProp.forEach((prop,i) => {
                this.root.setAttribute(prop,arrValue[i]);
            });
        }
        this.Render();
    }


    Remove(){
        this.root.remove();
    }

    Render(){
        this.parrent.append(this.root);
    }
}