import { MapRoutes } from "../src/routes.ts";

/*
structure
{TYPE}-{METHOD}-{DOMAIN}@{uri}

BASIC-GET-https://test.com:4848@/home
*/

const routes = new MapRoutes();

routes.set("GET@/home", {
    route: "GET@/home",
    method: "GET",
    response: "Hello World"
});

routes.set("GET@/images/:image.jpg", {
    route: "GET@/images/:image.jpg",
    method: "GET",
    response: "image"
});

routes.set("GET@/papa/*", {
    route: "GET@/papa/*",
    method: "GET",
    response: "any"
});

routes.set("POST@/api/users/:id/", {
    route: "POST@/api/users/:id/",
    method: "POST",
    response: "id"
});

routes.set("GET@/user/:id", {
    route: "GET@/user/:id",
    method: "GET",
    response: "id"
})

routes.set("GET@/user/:id/:post", {
    route: "GET@/user/:id/:post",
    method: "GET",
    response: "id-post"
})

routes.set("GET@/(about|information)", {
    route: "GET@/(about|information)",
    method: "GET",
    response: "info"
})

routes.set("GET@/search/:category-:status-:post", {
    route: "GET@/search/:category-:status-:post",
    method: "GET",
    response: "search"
})

routes.set("(GET|POST)@/people/:name", {
    route: "(GET|POST)@/people/:name",
    method: ["GET", "POST"],
    response: "people"
})


routes.set("PUT@/people/:name?", {
    route: "PUT@/people/:name?",
    method: "PUT",
    response: "people"
})

routes.set("GET@/watch/:type?/:id?", {
    route: "GET@/watch/:type?/:id?",
    method: "GET",
    response: "watch"
})

routes.set("GET@/minecraft/:version(1.7.2|1.5.2)", {
    route: "GET@/minecraft/:version(1.7.2|1.5.2)",
    method: "GET",
    response: "minecraft"
})


const response = routes.getRegExp("GET@/about");

console.log(response);