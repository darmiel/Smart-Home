import $ from 'jquery'

export async function news_getter() {
    const news = {}
    await $.get('https://www.tagesschau.de/xml/rss2/', function (data) {
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);

            news[el.find("title").text()] = el.find("link").text();
        });
    });
    return news;
}


