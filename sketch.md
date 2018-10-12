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