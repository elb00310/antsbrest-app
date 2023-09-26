export class Component{
    root:HTMLElement;
    
    constructor(
        public parrent: HTMLElement,
        tegName:keyof HTMLElementTagNameMap,
        content?: string | null
    ){
        this.root = document.createElement(tegName);
        if (content) this.root.innerHTML = content;
        this.myRender();
    }

    myRemove(){
        this.root.remove();
    }

    myRender(){
        this.parrent.append(this.root);
    }
}