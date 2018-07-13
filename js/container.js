function Photoes(photoes, parent, items, onChange) {

    let $el = $('<div class="container"/>').appendTo(parent);
    let $photo = $(`<div class="bigPhoto"/>`).appendTo(parent);
    let self =this;
    this.items = items.slice();

    spawnPhotoes(self.items);
    bigPhotoSpawner();
    dateUpdate();
    deletePhoto();

    function spawnPhotoes(id) {
        let ids = {};
        console.dir(id);
        if(id !== undefined)
        id.forEach((item) => {
           ids[item] = true;
        });
        photoes.forEach((item) => {
            if(!ids[item.id])
            $(`<div class="photo" data-id="${item.id}"><div class="delList"></div><img src="${item.img}"></div>`).appendTo(`.container`)
        })
    }

    function imgCount() {
        let $phot = $(`.photo`)
        let count = $phot.length;
       $phot.each((index,item)=> {
            if($(item).css(`display`)=="none") {
                count-=1;
            }
        });
        return count;
    }

    function dateUpdate() {
        setInterval(() => {
            let count = imgCount(),
                now = new Date(),
                date = now.getDate(),
                month = now.getMonth()+1,
                year = now.getFullYear(),
                hour = now.getHours(),
                minutes = now.getMinutes();
            $(`.date`).val(`${date.toString().padStart(2,"0")}.${month.toString().padStart(2,"0")}.${year}
                 ${hour.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}
                  Картинок: ${count}`);
        },100)
    }

    function clearAll() {
        $el.children().remove();
        self.items =[];
        localStorage.clear();
    }

    function deletePhoto() {
        $(`.photo`).on(`click`, `.delList`, (event) => {
            let $star = getId(event)[1];
            let id = getId(event)[0];
            self.items.push(id);
            $star.remove();
            onChange(self.items);
        });
    }

    $(`.refresher button`).on(`click`, ()=> {
        clearAll();
        spawnPhotoes();
        bigPhotoSpawner();
        deletePhoto();
    });

    function bigPhotoSpawner() {
        $(`.photo`).on(`click`, `img`, (event) => {
            let id = getId(event)[0];
            $(`.bigPhoto`).css({display: `flex`});
            bigPhoto(id);
            console.dir(photoes);
        });
    }

    function bigPhoto(id) {
        $(`<div>
                <img src="${photoes[id].img}">
                <button class="closeBig">Скрыть</button>
            </div>`).appendTo(`.bigPhoto`)
    }

    $(`main`).on(`click`, `.closeBig`, ()=> {
        let $el = $(`.bigPhoto`);
        $el.children().remove();

        $el.css({display: `none`});
        console.dir($el)
    });

    function getId(event) {
        let item = event.target;
        let $star = $(item).closest(`.photo`);
        let id = $star.data(`id`);
        return [id,$star];
    }
}