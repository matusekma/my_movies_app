redirectMW - kezdőoldalra navigálás ('/') esetén, ha be van jelentkezve a user, akkor a lista oldalra ('/lists') viszi, ha nem, akkor a loginra
renderMW - rendereli a paraméterként kapott screent
validateLoginMW - ha a user helyes adatokat adott meg, akkor bejelentkezteti (sessionbe kerül az id) és a kezdőoldalra (''/') viszi,
                   ha nem, akkor next()-et hív
validateRegistrationMW - ha a user megfelelő adatokat adott meg, akkor adatok elmentése, és redirect a login oldalra ('/login')
                      ha nem, akkor next-et hív
checkForgotPassMW - leellenőrzi, hogy a megadott email-lel valóban regisztráltak-e
authMW - ha a user nincs bejelentkezve, akkor redirect a kezdőoldalra ('/')
inverseAuthMW - ha a user be van jelentkezve, akkor redirect a kezdőoldalra ('/')
logoutMW - törli a sessiont, és next-et hív

getCategoriesActorsMW - visszaadja a kategóriákat és a színészeket
getCategoryMW - visszaadja a megadott id-jű kategória nevét

getFilmsByCategoryMW - visszaadja egy adott kategória filmjeit
setFilmAsWatchedMW - beállítja a megadott filmet megnézettre

getFilmMW - visszaadja egy adott film adatait
saveFilmMW - elmenti az adott film adatait (ha új, akkor újat hoz létre, egyébként módosít), majd visszatér a filmek listájához
deleteFilmMW - kitörli a megadott filmet

getActorMW - visszaadja egy színész adatait
deleteActorMW - kitörli a megadott színészt
saveActorMW - elmenti a megadott adatokat a színészről (ha új, akkor újat hoz létre, egyébként módosít)


GET / - főoldal
    redirectMW

GET /login - login
POST /login
    invAuthMW
    validateLoginMW
    renderMW


GET /logout - logout screen
    logoutMW
    renderMW

GET /forgot - forgot password screen
POST /forgot - forgot password email-cím
    invAuthMW
    renderMW

GET /register - regisztráció
POST /register - regisztráció form
    invAuthMW
    validateRegistrationMW
    renderMW

GET /lists - film és actor lista
    authMW
    getCategoriesActorsMW
    renderMW

GET /actor/:actorid/del - actor törlése
    authMW
    getActorMW
    deleteActorMW
    renderMW

GET /actors/new - színész felvétele
POST /actors/new
    authMW
    saveActorMW
    renderMW

GET /actor/:actorid - színész adatai
    authMW
    getActorMW
    renderMW

GET /actor/:actorid/edit - actor szerkesztése
POST /actor/:actorid/edit
    authMW
    getActorMW
    saveActorMW
    renderMW

GET /films/:categoryid - kategória filmjei
    authMW
    getCategory
    getFilmsByCategoryMW
    renderMW

GET /films/:categoryid/:filmid/del - film törlése
    authMW
    getFilmMW
    deleteFilmMW
    renderMW

GET /films/:categoryid/:filmid/watch - megnézetté válik egy film
    authMW
    getFilmMW
    setFilmAsWatchedMW
    saveFilmMW
    renderMW

GET /films/:categoryid/new - új még nem megnézett film felvétele adott kategóriába
POST /films/:categoryid/new
    authMW
    saveFilmMW
    renderMW

GET /films/:categoryid/new/watched - új már megnézett film felvétele adott kategóriába
POST /films/:categoryid/new/watched
    authMW
    saveFilmMW
    renderMW

GET /film/:filmid
    authMW
    getFilmMW
    renderMW

GET /film/:filmid/edit - film szerkesztése
POST /film/:filmid/edit
    authMW
    getFilmMW
    saveFilmMW
    renderMW