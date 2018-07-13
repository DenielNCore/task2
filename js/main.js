$(function () {
    const ITEMS_KEY = 'deletedPhoto';

    let items = JSON.parse(localStorage.getItem(ITEMS_KEY) || null) || [];

    new Photoes(photoes, 'main', items, (items) => {
        localStorage.setItem(ITEMS_KEY, JSON.stringify(items));

    });
});