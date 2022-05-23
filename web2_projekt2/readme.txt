URL: adv-web-projekt2.herokuapp.com

Ostvarene ranjivosti:
    - SQL injection
    - Broken Access Control
    - XXE

U gornjem desnom kutu postoji gumb kojim se globalno mijenja razina sigurnosti za sve ranjivosti.

SQL umetanje:
Implementirano kao pretraga korisnika po imenu.
Za isprobati pretragu, imena postojećih korisnika u bazi su admin, user1 i user2.
Tautologiju koristimo tako da se umjesto imena korisnika upiše: ' OR 1=1--
UNION upitima se, primjerice, mogu dobiti hashed šifre korisnika tako da se u UNION dijelu promjeni redoslijed atributa: ' UNION SELECT id, name, password, email FROM user--
Kod visoke razine sigurnosti, napad je onemogućen korištenjem parametriziranih upita i sanitizacijom unosa.

Loša kontrola pristupa:
Pretpostavljeni scenarij je da je ulogirani korisnik user1 te on ima uvid u svoj profil. Kada je sigurnost niska može se promjeniti ID u URL-u u 1 ili 3 te se pristupiti tuđim profilima.
Također, izostavljanjem ID-a iz URL-a prikazuje se administratorov pregled svih korisnika.
Kada je sigurnost postavljena na visoku razinu, tada prijavljeni korisnik(pretpostavljeni user1) vidi samo svoj korisnički račun, a ostali pokušaji vraćaju 403 Unauthorized.

XXE:
U source kodu aplikacije postoje regular.xml i xxe.xml datoteke koje su predviđene za upload prilikom ove demonstracije. Datoteka regular.xml pokazuje funkcionalnost bez XXE napada, bez obzira na razinu sigurnosti.
Prilikom parsiranja xxe.xml datoteke, na niskoj razini sigurnosti, aplikacija će dohvatiti vanjsku sistemsku etc/passwd datoteku, dok to s visokom razinom sigurnosti nije moguće. To je postignuto promjenom postavki XML parsera (korišten libxmljs paket).