redirectMW - kezdőoldalra navigálás ('/') esetén, ha be van jelentkezve a user, akkor a lista oldalra ('/lists') viszi, ha nem, akkor a loginra
renderMW - rendereli a paraméterként kapott screent
checkLoginMW - ha a user helyes adatokat adott meg, akkor bejelentkezteti (sessionbe kerül az id) és a kezdőoldalra (''/') viszi,
                   ha nem, akkor next()-et hív
checkRegistrationMW - ha a user megfelelő adatokat adott meg, akkor adatok elmentése, és redirect a login oldalra ('/login')
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

POST /login  - login
    checkLoginMW


GET /logout - logout screen
    logoutMW

GET /forgot - forgot password screen
    auth
POST /forgot - forgot password email-cím

GET /register - regisztráció
POST /register - regisztráció form
    inverseAuthMW
    checkRegistrationMW
    renderMW

GET /lists - film és actor lista
    authMW
    getCategoriesActorsMW
    renderMW

GET /actor/:actorid/del - actor törlése
    authMW
    getActorMW
    deleteActorMW

GET /actors/new - színész felvétele
POST /actors/new

GET /actor/:actorid - színész adatai

GET /actor/:actorid/edit - actor szerkesztése
POST /actor/:actorid/edit

GET /films/:categoryid - kategória filmjei
POST /films/:categoryid

GET /films/:categoryid/:filmid/del - film törlése

GET /films/:categoryid/:filmid/watch - megnézetté válik egy film

GET /films/:categoryid/new - új még nem megnézett film felvétele adott kategóriába
POST /films/:categoryid/new

GET /films/:categoryid/new/watched - új már megnézett film felvétele adott kategóriába
POST /films/:categoryid/new/watched

GET /film/:filmid

GET /film/:filmid/edit - film szerkesztése
POST /film/:filmid/edit