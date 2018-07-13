function Photoes(photoes, parent) {
    let $el = $('<div class="container"/>').appendTo(parent);

    spawnPhotoes();

    function spawnPhotoes() {
        photoes.forEach((item) => {
            $(`<div class="photo"><div class="delList"></div><img src="${item.img}"></div>`).appendTo(`.container`)
        })
    }
    imgCount();
    dateUpdate();

    function imgCount() {
        let $phot = $(`.photo`)
        let count = $phot.length;
       $phot.each((index,item)=> {
            if($(item).css(`display`)=="none") {
                count-=1;
            }

           //console.dir($(item).css(`display`));
        });
        console.dir(count);
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



    $(`.photo`).on(`click`,`.delList`,(event) => {
        let id = event.target;
        $(id).closest(`.photo`).hide();

       // $(`.date`).val($(`.photo`).length)
    });

    $(`.refresher button`).on(`click`, ()=> {
        $(`.photo`).each((index,item)=> {
            $(item).show();
        });

    })

    //console.dir($(id).css(`display`));
}